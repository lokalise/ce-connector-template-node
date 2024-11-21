if (process.env.NEW_RELIC_ENABLED !== 'false') {
  await import('newrelic')
}

import { getApp } from './app.js'
import type { Config } from './infrastructure/config.js'
import { getConfig, isProduction } from './infrastructure/config.js'
import {
  executeAndHandleGlobalErrors,
  globalLogger,
  resolveGlobalErrorLogObject,
} from './infrastructure/errors/globalErrorHandler.js'

async function start() {
  globalLogger.info('Starting application...')
  const config = executeAndHandleGlobalErrors<Config>(getConfig)
  const app = await getApp({
    enableMetrics: isProduction(),
  })

  try {
    await app.listen({
      host: config.app.bindAddress,
      port: config.app.port,
    })
  } catch (err) {
    app.log.error(resolveGlobalErrorLogObject(err))
    process.exit(1)
  }
}

void start()
