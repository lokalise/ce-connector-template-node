import fastify from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { isDevelopment } from './infrastructure/config'
import { errorHandler } from './infrastructure/errors/errorHandler'
import routeDefinitions from './modules/routes'
import { integrationConfigPlugin } from './plugins/integrationConfigPlugin'

const API_VERSION = '2.1.1'

const getMajorApiVersion = (): string => {
  return parseInt(API_VERSION).toString()
}

export async function getApp() {
  const app = fastify({
    logger: isDevelopment()
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              quietReqLogger: true,
              crlf: true,
              levelFirst: true,
              singleLine: true,
              messageFormat: '[{context}] {msg}',
              errorLikeObjectKeys: [],
              translateTime: 'SYS:standard',
              ignore: 'hostname,pid',
            },
          },
        }
      : true,
  })

  const versionPrefix = `/v${getMajorApiVersion()}`

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  void app.register(integrationConfigPlugin, {
    skipList: [
      '/$', // Healthcheck
      ...[`\\/auth$`, `\\/auth/response$`].map((url) => `^\\${versionPrefix}`.concat(url)),
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

    app.route({
      method: 'GET',
      url: '/health',
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
