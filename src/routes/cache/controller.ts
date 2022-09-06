import type { FastifyRequest } from 'fastify'

import cacheService from '../../services/cacheService'

import type { CacheRequestBody, CacheResponse, ListCacheResponse } from './types'

const getCache = async (req: FastifyRequest, reply: ListCacheResponse) => {
  const items = await cacheService.listItems(req.accessToken)
  if (!items) {
    void reply.status(403).send({
      message: 'Could not retrieve cache items',
      statusCode: 403,
    })
    return
  }

  return reply.send({
    items,
  })
}

const getCacheItems = async (
  req: FastifyRequest<{ Body: CacheRequestBody }>,
  reply: CacheResponse,
) => {
  const items = await cacheService.getItems(req.accessToken, req.body.items)
  if (!items) {
    void reply.status(403).send({
      message: 'Could not retrieve cache items',
      statusCode: 403,
    })
    return
  }

  return reply.send({
    items,
  })
}

const cacheController = {
  getCache,
  getCacheItems,
}

export default cacheController
