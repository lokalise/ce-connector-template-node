import { apiError } from '../schema'
import type { Routes } from '../types'

import authController from './controller'
import { authRequestBody, authRefreshRequestBody, authResponseBody } from './schema'

const authRouteDefinition: Routes = [
  {
    method: 'POST',
    url: '/auth',
    handler: authController.postAuth,
    schema: {
      body: authRequestBody,
      response: {
        200: authResponseBody,
        403: apiError,
      },
    },
  },
  {
    method: 'POST',
    url: '/auth/refresh',
    handler: authController.postAuthRefresh,
    schema: {
      body: authRefreshRequestBody,
      response: {
        200: authResponseBody,
        403: apiError,
      },
    },
  },
]

export default authRouteDefinition
