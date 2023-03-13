import { apiError } from '../commonSchemas'
import type { Routes } from '../commonTypes'

import cacheController from './cacheController'
import { cacheRequestBody, cacheResponseBody, listCacheResponseBody } from './cacheSchemas'

const cacheRouteDefinition: Routes = [
  {
    method: 'GET',
    url: '/cache',
    handler: cacheController.getCache,
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
    handler: cacheController.getCacheItems,
    schema: {
      body: cacheRequestBody,
      response: {
        200: cacheResponseBody,
        403: apiError,
      },
    },
  },
]

export default cacheRouteDefinition
