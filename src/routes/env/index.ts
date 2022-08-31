import { buildJsonSchemas } from 'fastify-zod'

import { apiError } from '../schema'

import envController from './controller'
import { envResponseBody } from './schema'

const { schemas, $ref } = buildJsonSchemas(
  {
    envResponseBody,
    apiError,
  },
  {
    $id: 'envSchemas',
  },
)

const envRouteDefinition = {
  schemas,
  routes: [
    {
      method: 'GET',
      url: '/env',
      handler: envController.getEnv,
      schema: {
        response: {
          200: $ref('envResponseBody'),
          403: $ref('apiError'),
        },
      },
    },
  ],
}
export default envRouteDefinition
