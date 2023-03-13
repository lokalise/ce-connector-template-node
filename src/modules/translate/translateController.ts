import type { FastifyRequest } from 'fastify'

import translateService from './translateService'
import type { TranslateRequestBody, TranslateResponse } from './translateTypes'

const getContent = async (
  req: FastifyRequest<{ Body: TranslateRequestBody }>,
  reply: TranslateResponse,
) => {
  const [items, updateItems] = await translateService.getContent(
    req.integrationConfig,
    req.authConfig,
    req.body.locales,
    req.body.items,
    req.body.defaultLocale,
  )
  if (!items) {
    await reply.status(403).send({
      message: 'Could not retrieve content items',
      statusCode: 403,
      error: 'Invalid credentials',
    })
    return
  }

  await reply.send({ items, updateItems })
}

const translateController = {
  getContent,
}

export default translateController
