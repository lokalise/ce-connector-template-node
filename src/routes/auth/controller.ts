import type { FastifyRequest } from 'fastify'

import authService from '../../services/authService'

import type {
  AuthResponse,
  PostAuthRefreshRequestPayload,
  PostAuthRequestPayload,
  AuthRefreshResponse,
} from './types'

const postAuth = async (
  req: FastifyRequest<{ Body: PostAuthRequestPayload }>,
  reply: AuthResponse,
) => {
  const authConfig = await authService.validate(req.body)

  if (!authConfig) {
    void reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  return reply.send({
    authConfig,
  })
}

const postAuthRefresh = async (
  req: FastifyRequest<{ Body: PostAuthRefreshRequestPayload }>,
  reply: AuthRefreshResponse,
) => {
  const authConfig = await authService.refresh(req.integrationConfig, req.body)

  if (!authConfig) {
    void reply.status(403).send({
      message: 'Could not authenticate to 3rd party using the provided key.',
      statusCode: 403,
    })
    return
  }

  return reply.send({
    authConfig,
  })
}

const authController = {
  postAuth,
  postAuthRefresh,
}

export default authController
