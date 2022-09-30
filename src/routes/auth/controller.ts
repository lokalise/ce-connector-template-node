import type { FastifyRequest } from 'fastify'

import authService from '../../services/authService'

import type {
  PostAuthResponse,
  GetAuthResponse,
  PostAuthResultRequestPayload,
  PostAuthResultResponse,
  PostAuthRefreshResponse,
} from './types'

const getAuth = async (req: FastifyRequest, reply: GetAuthResponse) => {
  await reply.send({
    // type can be either apiToken or OAuth that depends on the app authorization strategy
    type: 'apiToken',
  })
}

const postAuth = async (req: FastifyRequest, reply: PostAuthResponse) => {
  // Api key flow: delete next line if your connector uses OAuth
  const authConfig = await authService.validate(req.integrationConfig)
  // OAuth flow: uncomment next line if your connect uses OAuth otherwise delete it
  // const authConfig = await authService.generateAuthorizationUrl(req.integrationConfig)

  if (!authConfig) {
    await reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  await reply.send(authConfig)
}

const postAuthRefresh = async (req: FastifyRequest, reply: PostAuthRefreshResponse) => {
  const authConfig = await authService.refresh(req.integrationConfig, req.authConfig)

  if (!authConfig) {
    await reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  return reply.send(authConfig)
}

const postAuthResponse = async (
  req: FastifyRequest<{ Body: PostAuthResultRequestPayload }>,
  reply: PostAuthResultResponse,
) => {
  const credentials = await authService.getAuthCredentials(req.body)

  if (!credentials) {
    await reply.status(403).send({
      message: 'Authorization failed',
      errorCode: 403,
    })
    return
  }

  return reply.send(credentials)
}

const authController = {
  getAuth,
  postAuth,
  postAuthRefresh,
  postAuthResponse,
}

export default authController
