import { apiError, authError } from '../schema'
import type { Routes } from '../types'

import authController from './controller'
import {
  getAuthResponseBody,
  postAuthResponseBody,
  postAuthResultResponseBody,
  postAuthResultRequestBody,
} from './schema'

const authRouteDefinition: Routes = [
  {
    method: 'GET',
    url: '/auth',
    handler: authController.getAuth,
    schema: {
      response: {
        200: getAuthResponseBody,
      },
    },
  },
  {
    method: 'POST',
    url: '/auth',
    handler: authController.postAuth,
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
    handler: authController.postAuthRefresh,
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
    handler: authController.postAuthResponse,
    schema: {
      body: postAuthResultRequestBody,
      response: {
        200: postAuthResultResponseBody,
        403: authError,
      },
    },
  },
]

export default authRouteDefinition
