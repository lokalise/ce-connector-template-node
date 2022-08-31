import fastify from 'fastify'

import authTokenValidatorPlugin from './plugins/authTokenValidatorPlugin'
import routeDefinitions from './routes'

const API_VERSION = '1.0.0'

const getMajorApiVersion = (): string => {
  return parseInt(API_VERSION).toString()
}

const getApp = async () => {
  const app = fastify()

  const versionPrefix = `/v${getMajorApiVersion()}`

  app.register(authTokenValidatorPlugin, {
    skipList: [
      '/$', // Healthcheck
      ...[`\\/auth$`].map((url) => `^\\${versionPrefix}`.concat(url)),
    ],
  })

  app.after(() => {
    // Healthcheck
    app.route({
      method: 'GET',
      url: '/',
      handler: (request, reply) => {
        reply.send('OK')
      },
    })

    routeDefinitions.schemas.forEach((schema) => app.addSchema(schema))
    routeDefinitions.routes.forEach((route) =>
      app.route({
        ...route,
        url: versionPrefix.concat(route.url),
      }),
    )
  })

  await app.ready()

  return app
}

export default getApp
