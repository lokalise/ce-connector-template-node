import { apiError } from '../commonSchemas.ts'
import type { Routes } from '../commonTypes.ts'

import { getCache, getCacheItems } from './cacheController.ts'
import { cacheRequestBody, cacheResponseBody, listCacheResponseBody } from './cacheSchemas.ts'

export const cacheRouteDefinition: Routes = [
  {
    method: 'GET',
    url: '/cache',
    handler: getCache,
    schema: {
      response: {
        200: listCacheResponseBody,
        403: apiError,
      },
    },
  },
  {
    method: 'POST',
    url: '/cache/items',
    handler: getCacheItems,
    schema: {
      body: cacheRequestBody,
      response: {
        200: cacheResponseBody,
        403: apiError,
      },
    },
  },
]
