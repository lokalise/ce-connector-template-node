import type { FastifyRequest } from 'fastify'

import publishService from '../../services/publishService'

import type { PublishRequestBody, PublishResponse } from './types'

const publishContent = async (
  req: FastifyRequest<{ Body: PublishRequestBody }>,
  reply: PublishResponse,
) => {
  const publishResult = await publishService.publishContent(req.accessToken, req.body.items)
  if (!publishResult) {
    reply.status(403).send({
      message: 'Could not publish content',
      statusCode: 403,
      error: 'Invalid credentials',
    })
    return
  }

  reply.send({
    status: 200,
    message: 'Content successfully updated',
  })
}

const publishController = {
  publishContent,
}

export default publishController
