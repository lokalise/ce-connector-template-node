import type { FastifyRequest } from 'fastify'

import cacheService from './cacheService'
import type { CacheRequestBody, CacheResponse, ListCacheResponse } from './cacheTypes'

const getCache = async (req: FastifyRequest, reply: ListCacheResponse) => {
  const items = await cacheService.listItems(req.integrationConfig, req.authConfig)
  if (!items) {
    await reply.status(403).send({
      message: 'Could not retrieve cache items',
      statusCode: 403,
    })
    return
  }

  await reply.send({
    items,
  })
}

const getCacheItems = async (
  req: FastifyRequest<{ Body: CacheRequestBody }>,
  reply: CacheResponse,
) => {
  const items = await cacheService.getItems(req.integrationConfig, req.authConfig, req.body.items)
  if (!items) {
    await reply.status(403).send({
      message: 'Could not retrieve cache items',
      statusCode: 403,
    })
    return
  }

  await reply.send({
    items,
  })
}

const cacheController = {
  getCache,
  getCacheItems,
}

export default cacheController
