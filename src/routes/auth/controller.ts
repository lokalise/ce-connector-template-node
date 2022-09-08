import type { FastifyRequest } from 'fastify'

import authService from '../../services/authService'

import type {
  AuthResponse,
  PostAuthRefreshRequestPayload,
  PostAuthRequestPayload,
  AuthRefreshResponse,
  GetAuthResponse,
} from './types'

const getAuth = async (req: FastifyRequest, reply: GetAuthResponse) => {
  await reply.send({
    // type can be either apiToken or OAuth that depends on the app authorization strategy
    type: 'apiToken',
  })
}

const postAuth = async (
  req: FastifyRequest<{ Body: PostAuthRequestPayload }>,
  reply: AuthResponse,
) => {
  const key = await authService.validate(req.body.key)

  if (!key) {
    void reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  return reply.send({
    key,
  })
}

const postAuthRefresh = async (
  req: FastifyRequest<{ Body: PostAuthRefreshRequestPayload }>,
  reply: AuthRefreshResponse,
) => {
  const key = await authService.refresh(req.body.refreshKey)

  if (!key) {
    void reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  return reply.send({
    key,
  })
}

const authController = {
  getAuth,
  postAuth,
  postAuthRefresh,
}

export default authController
