import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import fp from 'fastify-plugin'

import { decodeBase64 } from './helpers'

declare module 'fastify' {
  interface FastifyRequest {
    authConfig: Record<string, unknown>
    integrationConfig: Record<string, unknown>
  }
}

interface PluginOptions {
  skipList: string[]
}

const AUTH_HEADER = 'X-Api-Token'
const CONFIG_HEADER = 'CE-Config'

function plugin(
  fastify: FastifyInstance,
  pluginOptions: PluginOptions,
  next: (err?: Error) => void,
) {
  fastify.decorateRequest('authConfig', undefined)
  fastify.decorateRequest('integrationConfig', undefined)

  const resolvedSkipList: RegExp[] = pluginOptions.skipList.map((regexStr) => new RegExp(regexStr))

  fastify.addHook(
    'onRequest',
    (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
      // Integration configuration
      const integrationConfigHeaderData = req.headers[CONFIG_HEADER.toLowerCase()] as
        | string
        | undefined
      if (integrationConfigHeaderData) {
        const integrationConfigDecoded = decodeBase64(integrationConfigHeaderData)
        if (!integrationConfigDecoded) {
          return done(new Error('Invalid configuration data provided'))
        }
        req.integrationConfig = integrationConfigDecoded
      }

      // Auth configuration
      if (resolvedSkipList.some((regex) => regex.test(req.routerPath))) {
        return done()
      }

      const authConfigHeaderData = req.headers[AUTH_HEADER.toLowerCase()] as string | undefined

      if (!authConfigHeaderData) {
        return done(new Error('Auth data not provided'))
      }

      const authConfigDecoded = decodeBase64(authConfigHeaderData)
      if (!authConfigDecoded) {
        return done(new Error('Invalid auth data provided'))
      }

      req.authConfig = authConfigDecoded

      return done()
    },
  )

  next()
}

const integrationConfigPlugin = fp<PluginOptions>(plugin, {
  fastify: '4.x',
  name: 'auth-token-validator-plugin',
})

export default integrationConfigPlugin
