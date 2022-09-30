import 'dotenv/config'

const config = {
  app: {
    env: process.env.APP_ENV || 'production',
    port: process.env.APP_PORT || '3000',
  },
}

export default config
