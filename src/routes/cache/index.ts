import { buildJsonSchemas } from 'fastify-zod'

import { apiError } from '../schema'

import cacheController from './controller'
import { cacheRequestBody, cacheResponseBody, listCacheResponseBody } from './schema'

const { schemas, $ref } = buildJsonSchemas(
  {
    listCacheResponseBody,
    cacheRequestBody,
    cacheResponseBody,
    apiError,
  },
  {
    $id: 'cacheSchemas',
  },
)

const cacheRouteDefinition = {
  schemas,
  routes: [
    {
      method: 'GET',
      url: '/cache',
      handler: cacheController.getCache,
      schema: {
        response: {
          200: $ref('listCacheResponseBody'),
          403: $ref('apiError'),
        },
      },
    },
    {
      method: 'POST',
      url: '/cache/items',
      handler: cacheController.getCacheItems,
      schema: {
        body: $ref('cacheRequestBody'),
        response: {
          200: $ref('cacheResponseBody'),
          403: $ref('apiError'),
        },
      },
    },
  ],
}

export default cacheRouteDefinition
