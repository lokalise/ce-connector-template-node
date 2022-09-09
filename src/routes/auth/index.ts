import { apiError, authError } from '../schema'
import type { Routes } from '../types'

import authController from './controller'
import {
  authRequestBody,
  authRefreshRequestBody,
  authResponseBody,
  getAuthResponseBody,
  authResponseResponseBody,
  authResponseRequestBody,
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
  {
    method: 'POST',
    url: '/auth/response',
    handler: authController.postAuthResponse,
    schema: {
      body: authResponseRequestBody,
      response: {
        200: authResponseResponseBody,
        403: authError,
      },
    },
  },
]

export default authRouteDefinition
