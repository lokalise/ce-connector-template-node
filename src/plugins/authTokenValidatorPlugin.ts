import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyRequest {
    accessToken: string
  }
}

interface AuthTokenValidatorPluginOptions {
  skipList: string[]
}

const API_TOKEN_HEADER = 'X-Api-Token'

function plugin(
  fastify: FastifyInstance,
  pluginOptions: AuthTokenValidatorPluginOptions,
  next: (err?: Error) => void,
) {
  fastify.decorateRequest('accessToken', '')
  const resolvedSkipList: RegExp[] = pluginOptions.skipList.map((regexStr) => new RegExp(regexStr))

  fastify.addHook(
    'onRequest',
    (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
      if (resolvedSkipList.some((regex) => regex.test(req.routerPath))) {
        return done()
      }

      const accessToken = req.headers[API_TOKEN_HEADER.toLowerCase()] as string
      if (!accessToken) {
        return done(new Error('API token not provided'))
      }
      req.accessToken = accessToken

      return done()
    },
  )

  next()
}

const authTokenValidatorPlugin = fp<AuthTokenValidatorPluginOptions>(plugin, {
  fastify: '4.x',
  name: 'auth-token-validator-plugin',
})

export default authTokenValidatorPlugin
