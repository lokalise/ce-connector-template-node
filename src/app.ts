import type http from 'http'

import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix'
import {
  bugsnagPlugin,
  getRequestIdFastifyAppConfig,
  metricsPlugin,
  publicHealthcheckPlugin,
} from '@lokalise/fastify-extras'
import type { FastifyBaseLogger } from 'fastify'
import fastify from 'fastify'
import customHealthCheck from 'fastify-custom-healthcheck'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { getConfig, isDevelopment, isTest } from './infrastructure/config'
import { registerDependencies } from './infrastructure/diConfig'
import { errorHandler } from './infrastructure/errors/errorHandler'
import { resolveGlobalErrorLogObject } from './infrastructure/errors/globalErrorHandler'
import {
  dummyHealthCheck,
  registerHealthChecks,
  runAllHealthchecks,
} from './infrastructure/healthchecks'
import { resolveLoggerConfiguration } from './infrastructure/logger'
import { routeDefinitions } from './modules/routes'
import { integrationConfigPlugin } from './plugins/integrationConfigPlugin'

const GRACEFUL_SHUTDOWN_TIMEOUT_IN_MSECS = 10000
const API_VERSION = '2.1.1'

const getMajorApiVersion = (): string => {
  return parseInt(API_VERSION).toString()
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
  const loggerConfig = resolveLoggerConfiguration(appConfig)
  const enableRequestLogging = ['debug', 'trace'].includes(appConfig.logLevel)

  const app = fastify<http.Server, http.IncomingMessage, http.ServerResponse, FastifyBaseLogger>({
    ...getRequestIdFastifyAppConfig(),
    logger: loggerConfig,
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

  const healthcheckEndpoints = ['/', '/health']

  await app.register(integrationConfigPlugin, {
    skipList: [
      ...healthcheckEndpoints,
      ...[`/auth`, `/auth/response`].map((url) => `${versionPrefix}`.concat(url)),
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
      loggerOptions: loggerConfig,
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
  app.setErrorHandler(errorHandler)

  app.after(() => {
    routeDefinitions.routes.forEach((route) =>
      app.withTypeProvider<ZodTypeProvider>().route({
        ...route,
        url: versionPrefix.concat(route.url),
      }),
    )

    // Graceful shutdown hook
    if (!isDevelopment()) {
      app.gracefulShutdown((signal, next) => {
        app.log.info('Starting graceful shutdown')
        next()
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
