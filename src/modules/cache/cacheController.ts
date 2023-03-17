import type { FastifyRequest } from 'fastify'

import type { CacheRequestBody, CacheResponse, ListCacheResponse } from './cacheTypes'

export async function getCache(req: FastifyRequest, reply: ListCacheResponse) {
  const { cacheService } = req.diScope.cradle

  const items = await cacheService.listItems(req.integrationConfig, req.authConfig)

  await reply.send({
    items,
  })
}

export async function getCacheItems(
  req: FastifyRequest<{ Body: CacheRequestBody }>,
  reply: CacheResponse,
) {
  const { cacheService } = req.diScope.cradle

  const items = await cacheService.getItems(req.integrationConfig, req.authConfig, req.body.items)

  await reply.send({
    items,
  })
}
