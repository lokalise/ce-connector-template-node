import { buildJsonSchemas } from 'fastify-zod'

import { apiError } from '../schema'

import translateController from './controller'
import { translateRequestBody, translateResponseBody } from './schema'

const { schemas, $ref } = buildJsonSchemas(
  {
    translateRequestBody,
    translateResponseBody,
    apiError,
  },
  {
    $id: 'translateSchemas',
  },
)

const translateRouteDefinition = {
  schemas,
  routes: [
    {
      method: 'POST',
      url: '/translate',
      handler: translateController.getContent,
      schema: {
        body: $ref('translateRequestBody'),
        response: {
          200: $ref('translateResponseBody'),
          403: $ref('apiError'),
        },
      },
    },
  ],
}
export default translateRouteDefinition
