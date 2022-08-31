import type { FastifyRequest } from 'fastify'

import translateService from '../../services/translateService'

import type { TranslateRequestBody, TranslateResponse } from './types'

const getContent = async (
  req: FastifyRequest<{ Body: TranslateRequestBody }>,
  reply: TranslateResponse,
) => {
  const items = await translateService.getContent(req.accessToken, req.body.locales, req.body.items)
  if (!items) {
    reply.status(403).send({
      message: 'Could not retrieve content items',
      statusCode: 403,
      error: 'Invalid credentials',
    })
    return
  }

  reply.send({ items })
}

const translateController = {
  getContent,
}

export default translateController
