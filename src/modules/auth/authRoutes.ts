import { getAuthResponseBody, postAuthResponseBody } from '@lokalise/connector-api-contracts'
import { apiError, authError } from '../commonSchemas.ts'
import type { Routes } from '../commonTypes.ts'
import { getAuth, postAuth, postAuthRefresh, postAuthResponse } from './authController.ts'

export const authRouteDefinition: Routes = [
  {
    method: 'GET',
    url: '/auth',
    handler: getAuth,
    schema: {
      response: {
        200: getAuthResponseBody,
      },
    },
  },
  {
    method: 'POST',
    url: '/auth',
    handler: postAuth,
    schema: {
      response: {
        200: postAuthResponseBody,
        403: apiError,
      },
    },
  },
  {
    method: 'POST',
    url: '/auth/refresh',
    handler: postAuthRefresh,
    schema: {
      response: {
        200: postAuthResponseBody,
        403: apiError,
      },
    },
  },
  {
    method: 'POST',
    url: '/auth/response',
    handler: postAuthResponse,
    schema: {
      body: postAuthResponseBody,
      response: {
        200: postAuthResponseBody,
        403: authError,
      },
    },
  },
]
