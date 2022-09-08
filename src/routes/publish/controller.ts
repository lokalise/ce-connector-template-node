import type { FastifyRequest } from 'fastify'

import publishService from '../../services/publishService'

import type { PublishRequestBody, PublishResponse } from './types'

const publishContent = async (
  req: FastifyRequest<{ Body: PublishRequestBody }>,
  reply: PublishResponse,
) => {
  const publishResult = await publishService.publishContent(
    req.integrationConfig,
    req.authConfig,
    req.body.items,
    req.body.defaultLocale,
  )
  if (!publishResult) {
    await reply.status(403).send({
      message: 'Could not publish content',
      statusCode: 403,
      error: 'Invalid credentials',
    })
    return
  }
}

const publishController = {
  publishContent,
}

export default publishController
