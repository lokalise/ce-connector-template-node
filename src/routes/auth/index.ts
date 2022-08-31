import { buildJsonSchemas } from 'fastify-zod'

import { apiError } from '../schema'

import authController from './controller'
import { authRequestBody, authRefreshRequestBody, authResponseBody } from './schema'

const { schemas, $ref } = buildJsonSchemas(
  {
    authRequestBody,
    authResponseBody,
    authRefreshRequestBody,
    apiError,
  },
  {
    $id: 'authSchemas',
  },
)

const authRouteDefinition = {
  schemas,
  routes: [
    {
      method: 'POST',
      url: '/auth',
      handler: authController.postAuth,
      schema: {
        body: $ref('authRequestBody'),
        response: {
          200: $ref('authResponseBody'),
          403: $ref('apiError'),
        },
      },
    },
    {
      method: 'POST',
      url: '/auth/refresh',
      handler: authController.postAuthRefresh,
      schema: {
        body: $ref('authRefreshRequestBody'),
        response: {
          200: $ref('authResponseBody'),
          403: $ref('apiError'),
        },
      },
    },
  ],
}
export default authRouteDefinition
