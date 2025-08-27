import type http from 'node:http'

import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix'
import {
  bugsnagErrorReporter,
  bugsnagPlugin,
  commonHealthcheckPlugin,
  createErrorHandler,
  getRequestIdFastifyAppConfig,
  metricsPlugin,
  newrelicTransactionManagerPlugin,
} from '@lokalise/fastify-extras'
import { resolveLogger } from '@lokalise/node-core'
import type { AwilixContainer } from 'awilix'
import type { FastifyBaseLogger } from 'fastify'
import fastify from 'fastify'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { type DependencyInjectionOptions, DIContext, type NestedPartial } from 'opinionated-machine'
import { stdSerializers } from 'pino'
import type {
  Dependencies,
  DependencyOverrides,
  ExternalDependencies,
} from './infrastructure/CommonModule.ts'
import { type Config, getConfig, isDevelopment, isTest } from './infrastructure/config.ts'
import { resolveGlobalErrorLogObject } from './infrastructure/errors/globalErrorHandler.ts'
import { dummyHealthCheck, runAllHealthchecks } from './infrastructure/healthchecks.ts'
import { routeDefinitions } from './modules/routes.ts'
import { ALL_MODULES } from './modules.js'
import { integrationConfigPlugin } from './plugins/integrationConfigPlugin.ts'

const GRACEFUL_SHUTDOWN_TIMEOUT_IN_MSECS = 10000
const API_VERSION = '2.1.1'

const getMajorApiVersion = (): string => {
  return Number.parseInt(API_VERSION, 10).toString()
}

export function getPrefix() {
  return `/v${getMajorApiVersion()}`
}

export type ConfigOverrides = DependencyInjectionOptions & {
  diContainer?: AwilixContainer
  healthchecksEnabled?: boolean
  monitoringEnabled?: boolean
} & NestedPartial<Config>

export async function getApp(
  configOverrides: ConfigOverrides = {},
  dependencyOverrides: DependencyOverrides = {},
) {
  const config = getConfig()
  const appConfig = config.app
  const logger = resolveLogger(appConfig)
  const enableRequestLogging = ['debug', 'trace'].includes(appConfig.logLevel)

  const app = fastify<http.Server, http.IncomingMessage, http.ServerResponse, FastifyBaseLogger>({
    ...getRequestIdFastifyAppConfig(),
    loggerInstance: logger,
    disableRequestLogging: !enableRequestLogging,
  })

  const versionPrefix = getPrefix()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  /**
   * Since DI config relies on having app-scoped NewRelic instance to be set by the plugin,
   * we instantiate it earlier than we run the DI initialization.
   */
  await app.register(newrelicTransactionManagerPlugin, {
    isEnabled: config.vendors.newrelic.isEnabled,
  })

  await app.register(fastifyAwilixPlugin, { disposeOnClose: true })
  const defaultSkipList = ['/', '/health', '/favicon.ico']

  await app.register(integrationConfigPlugin, {
    skipList: [
      ...defaultSkipList,
      ...['/auth', '/auth/response'].map((url) => `${versionPrefix}`.concat(url)),
    ],
  })

  if (configOverrides.healthchecksEnabled !== false) {
    await app.register(commonHealthcheckPlugin, {
      healthChecks: [
        {
          name: 'dummy',
          isMandatory: true,
          checker: dummyHealthCheck,
        },
      ],
      responsePayload: {
        version: appConfig.appVersion,
        gitCommitSha: appConfig.gitCommitSha,
      },
    })
  }

  // Vendor-specific plugins
  if (configOverrides.monitoringEnabled) {
    await app.register(metricsPlugin, {
      bindAddress: appConfig.bindAddress,
      errorObjectResolver: resolveGlobalErrorLogObject,
      logger,
      disablePrometheusRequestLogging: true,
    })
  }

  await app.register(bugsnagPlugin, {
    isEnabled: config.vendors.bugsnag.isEnabled,
    bugsnag: {
      apiKey: config.vendors.bugsnag.apiKey ?? '',
      releaseStage: appConfig.appEnv,
      appVersion: appConfig.appVersion,
    },
  })

  if (!isDevelopment()) {
    await app.register(fastifyGracefulShutdown, {
      resetHandlersOnInit: true,
      timeout: GRACEFUL_SHUTDOWN_TIMEOUT_IN_MSECS,
    })
  }
  app.setErrorHandler(
    createErrorHandler({
      errorReporter: bugsnagErrorReporter,
    }),
  )

  const diContext = new DIContext<Dependencies, Config, ExternalDependencies>(
    diContainer,
    /**
     * Running consumers and jobs introduces additional overhead and fragility when running tests,
     * so we avoid doing that unless we intend to actually use them
     */
    {
      enqueuedJobWorkersEnabled: configOverrides.enqueuedJobWorkersEnabled,
      messageQueueConsumersEnabled: configOverrides.messageQueueConsumersEnabled,
      jobQueuesEnabled: configOverrides.jobQueuesEnabled,
      periodicJobsEnabled: configOverrides.periodicJobsEnabled,
    },
    config,
  )

  const externalDependencies: ExternalDependencies = {
    app,
    logger: app.log,
  }

  diContext.registerDependencies(
    {
      modules: ALL_MODULES,
      dependencyOverrides,
      configOverrides,
    },
    externalDependencies,
  )

  app.after(() => {
    for (const route of routeDefinitions.routes) {
      app.withTypeProvider<ZodTypeProvider>().route({
        ...route,
        url: versionPrefix.concat(route.url),
      })
    }

    // Graceful shutdown hook
    if (!isDevelopment()) {
      app.gracefulShutdown(() => {
        app.log.info('Starting graceful shutdown')
      })
    }
  })

  try {
    await app.ready()
    if (!isTest() && configOverrides.healthchecksEnabled !== false) {
      await runAllHealthchecks(app)
    }
  } catch (err) {
    app.log.error({ error: stdSerializers.err(err as Error) }, 'Error while initializing app: ')
    throw err
  }

  return app
}
