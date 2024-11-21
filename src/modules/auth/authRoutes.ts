import { apiError, authError } from '../commonSchemas.js'
import type { Routes } from '../commonTypes.js'

import { getAuth, postAuth, postAuthRefresh, postAuthResponse } from './authController.js'
import {
  getAuthResponseBody,
  postAuthResponseBody,
  postAuthResultRequestBody,
  postAuthResultResponseBody,
} from './authSchemas.js'

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
      body: postAuthResultRequestBody,
      response: {
        200: postAuthResultResponseBody,
        403: authError,
      },
    },
  },
]
