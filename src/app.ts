import type http from 'http'

import {
  bugsnagPlugin,
  getRequestIdFastifyAppConfig,
  metricsPlugin,
  publicHealthcheckPlugin,
} from '@lokalise/fastify-extras'
import fastify from 'fastify'
import customHealthCheck from 'fastify-custom-healthcheck'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import type pino from 'pino'

import { getConfig, isDevelopment } from './infrastructure/config'
import { errorHandler } from './infrastructure/errors/errorHandler'
import { resolveGlobalErrorLogObject } from './infrastructure/errors/globalErrorHandler'
import { resolveLoggerConfiguration } from './infrastructure/logger'
import routeDefinitions from './modules/routes'
import { healthcheckPlugin } from './plugins/healthcheckPlugin'
import { integrationConfigPlugin } from './plugins/integrationConfigPlugin'

const GRACEFUL_SHUTDOWN_TIMEOUT_IN_MSECS = 10000
const API_VERSION = '2.1.1'

const getMajorApiVersion = (): string => {
  return parseInt(API_VERSION).toString()
}

export async function getApp() {
  const config = getConfig()
  const appConfig = config.app
  const loggerConfig = resolveLoggerConfiguration(appConfig)
  const enableRequestLogging = ['debug', 'trace'].includes(appConfig.logLevel)

  const app = fastify<http.Server, http.IncomingMessage, http.ServerResponse, pino.Logger>({
    ...getRequestIdFastifyAppConfig(),
    logger: loggerConfig,
    disableRequestLogging: !enableRequestLogging,
  })

  const versionPrefix = `/v${getMajorApiVersion()}`

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await app.register(integrationConfigPlugin, {
    skipList: [
      '/',
      ...[`\\/auth$`, `\\/auth/response$`].map((url) => `^\\${versionPrefix}`.concat(url)),
    ],
  })

  await app.register(customHealthCheck, {
    path: '/health',
    logLevel: 'warn',
    info: {
      env: appConfig.nodeEnv,
      app_version: appConfig.appVersion,
      git_commit_sha: appConfig.gitCommitSha,
    },
    schema: false,
    exposeFailure: false,
  })
  await app.register(publicHealthcheckPlugin, {
    responsePayload: {
      version: appConfig.appVersion,
      gitCommitSha: appConfig.gitCommitSha,
      status: 'OK',
    },
  })
  await app.register(healthcheckPlugin)

  // Vendor-specific plugins
  if (appConfig.metrics.isEnabled) {
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
  })

  await app.ready()

  return app
}
