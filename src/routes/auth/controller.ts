import type { FastifyRequest } from 'fastify'

import authService from '../../services/authService'

import type {
  AuthResponse,
  PostAuthRefreshRequestPayload,
  PostAuthRequestPayload,
  AuthRefreshResponse,
  GetAuthResponse,
  PostAuthResponseRequestPayload,
} from './types'

const getAuth = async (req: FastifyRequest, reply: GetAuthResponse) => {
  await reply.send({
    // type can be either apiKey or OAuth that depends on the app authorization strategy
    type: 'apiKey',
  })
}

const postAuth = async (
  req: FastifyRequest<{ Body: PostAuthRequestPayload }>,
  reply: AuthResponse,
) => {
  const authConfig = await authService.validate(req.body)

  if (!authConfig) {
    await reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  return reply.send(authConfig)
}

const postAuthRefresh = async (
  req: FastifyRequest<{ Body: PostAuthRefreshRequestPayload }>,
  reply: AuthRefreshResponse,
) => {
  const authConfig = await authService.refresh(req.integrationConfig, req.body)

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
  req: FastifyRequest<{ Body: PostAuthResponseRequestPayload }>,
  reply: AuthRefreshResponse,
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
