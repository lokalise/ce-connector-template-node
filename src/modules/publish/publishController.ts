import type { FastifyRequest } from 'fastify'

import type { PublishRequestBody, PublishResponse } from './publishTypes'

export const publishContent = async (
  req: FastifyRequest<{ Body: PublishRequestBody }>,
  reply: PublishResponse,
) => {
  const { publishService } = req.diScope.cradle

  const [publishResult, updateItems] = await publishService.publishContent(
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

  await reply.send({
    status: 200,
    message: 'Content successfully updated',
    updateItems,
  })
}
