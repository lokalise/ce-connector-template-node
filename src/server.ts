import getApp from './app'
import config from './config'

async function start() {
  const app = await getApp()

  try {
    await app.listen(config.app.port, '0.0.0.0')
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    app.log.error(err.message)
    process.exit(1)
  }
}

start()
