import 'dotenv/config'

const config = {
  app: {
    port: process.env.APP_PORT || '3000',
  },
}

export default config
