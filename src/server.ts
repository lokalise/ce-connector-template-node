import getApp from './app'
import config from './config'
import { isObject } from './types'

const hasMessage = (error: unknown): error is { message: unknown } =>
  isObject(error) && 'message' in error

async function start() {
  const app = await getApp()

  try {
    await app.listen({ port: Number(config.app.port), host: '0.0.0.0' })
  } catch (error) {
    app.log.error(hasMessage(error) ? error.message : error)
    process.exit(1)
  }
}

void start()
