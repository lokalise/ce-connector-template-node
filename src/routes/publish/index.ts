import { buildJsonSchemas } from 'fastify-zod'

import publishController from './controller'
import { publishRequestBody, publishResponseBody } from './schema'

const { schemas, $ref } = buildJsonSchemas(
  {
    publishRequestBody,
    publishResponseBody,
  },
  {
    $id: 'publishSchemas',
  },
)

const publishRouteDefinition = {
  schemas,
  routes: [
    {
      method: 'POST',
      url: '/publish',
      handler: publishController.publishContent,
      schema: {
        body: $ref('publishRequestBody'),
        response: {
          200: $ref('publishResponseBody'),
        },
      },
    },
  ],
}
export default publishRouteDefinition
