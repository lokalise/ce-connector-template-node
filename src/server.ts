import {
  executeAndHandleGlobalErrors,
  globalLogger,
  resolveGlobalErrorLogObject,
} from '@lokalise/node-core'
import { getApp } from './app.ts'
import { getConfig, isProduction } from './infrastructure/config.ts'

async function start() {
  globalLogger.info('Starting application...')
  const config = executeAndHandleGlobalErrors(getConfig)
  const app = await getApp({
    monitoringEnabled: isProduction(),
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
