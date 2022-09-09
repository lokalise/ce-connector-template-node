import fastify from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { errorHandler } from './infrastructure/errors/errorHandler'
import integrationConfigPlugin from './plugins/integrationConfigPlugin'
import routeDefinitions from './routes'

const API_VERSION = '1.0.0'

const getMajorApiVersion = (): string => {
  return parseInt(API_VERSION).toString()
}

const getApp = async () => {
  const app = fastify()

  const versionPrefix = `/v${getMajorApiVersion()}`

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  void app.register(integrationConfigPlugin, {
    skipList: [
      '/$', // Healthcheck
      ...[`\\/auth$`].map((url) => `^\\${versionPrefix}`.concat(url)),
    ],
  })

  app.setErrorHandler(errorHandler)

  app.after(() => {
    // Healthcheck
    app.route({
      method: 'GET',
      url: '/',
      handler: (request, reply) => {
        void reply.send('OK')
      },
    })

    routeDefinitions.routes.forEach((route) =>
      app.withTypeProvider<ZodTypeProvider>().route({
        ...route,
        url: versionPrefix.concat(route.url),
      }),
    )
  })

  await app.ready()

  return app
}

export default getApp
