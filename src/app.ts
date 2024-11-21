import type http from 'node:http'

import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix'
import {
  bugsnagErrorReporter,
  bugsnagPlugin,
  createErrorHandler,
  getRequestIdFastifyAppConfig,
  metricsPlugin,
  publicHealthcheckPlugin,
} from '@lokalise/fastify-extras'
import { resolveLogger } from '@lokalise/node-core'
import type { FastifyBaseLogger } from 'fastify'
import fastify from 'fastify'
import customHealthCheck from 'fastify-custom-healthcheck'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { getConfig, isDevelopment, isTest } from './infrastructure/config.js'
import { registerDependencies } from './infrastructure/diConfig.js'
import { resolveGlobalErrorLogObject } from './infrastructure/errors/globalErrorHandler.js'
import {
  dummyHealthCheck,
  registerHealthChecks,
  runAllHealthchecks,
} from './infrastructure/healthchecks.js'
import { routeDefinitions } from './modules/routes.js'
import { integrationConfigPlugin } from './plugins/integrationConfigPlugin.js'

const GRACEFUL_SHUTDOWN_TIMEOUT_IN_MSECS = 10000
const API_VERSION = '2.1.1'

const getMajorApiVersion = (): string => {
  return Number.parseInt(API_VERSION).toString()
}

export function getPrefix() {
  return `/v${getMajorApiVersion()}`
}

export type ConfigOverrides = {
  enableMetrics?: boolean
  healthchecksEnabled?: boolean
}

export async function getApp(configOverrides: ConfigOverrides = {}) {
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

  await app.register(fastifyAwilixPlugin, { disposeOnClose: true })
  registerDependencies(
    diContainer,
    {
      app: app,
      logger: app.log,
    },
    {},
  )

  const defaultSkipList = ['/', '/health', '/favicon.ico']

  await app.register(integrationConfigPlugin, {
    skipList: [
      ...defaultSkipList,
      ...['/auth', '/auth/response'].map((url) => `${versionPrefix}`.concat(url)),
    ],
  })

  if (configOverrides.healthchecksEnabled !== false) {
    await app.register(customHealthCheck, {
      path: '/',
      logLevel: 'warn',
      info: {
        env: appConfig.nodeEnv,
        version: appConfig.appVersion,
        gitCommitSha: appConfig.gitCommitSha,
      },
      schema: false,
      exposeFailure: false,
    })
    await app.register(publicHealthcheckPlugin, {
      url: '/health',
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
  if (configOverrides.enableMetrics) {
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

    if (configOverrides.healthchecksEnabled !== false) {
      registerHealthChecks(app)
    }
  })

  try {
    await app.ready()
    if (!isTest() && configOverrides.healthchecksEnabled !== false) {
      await runAllHealthchecks(app)
    }
  } catch (err) {
    app.log.error('Error while initializing app: ', err)
    throw err
  }

  return app
}
