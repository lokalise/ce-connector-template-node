import { apiError } from '../commonSchemas.js'
import type { Routes } from '../commonTypes.js'

import { getCache, getCacheItems } from './cacheController.js'
import { cacheRequestBody, cacheResponseBody, listCacheResponseBody } from './cacheSchemas.js'

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
