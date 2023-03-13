import { apiError } from '../commonSchemas'
import type { Routes } from '../commonTypes'

import translateController from './translateController'
import { translateRequestBody, translateResponseBody } from './translateSchemas'

const translateRouteDefinition: Routes = [
  {
    method: 'POST',
    url: '/translate',
    handler: translateController.getContent,
    schema: {
      body: translateRequestBody,
      response: {
        200: translateResponseBody,
        403: apiError,
      },
    },
  },
]

export default translateRouteDefinition
