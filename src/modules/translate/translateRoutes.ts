import { apiError } from '../commonSchemas.js'
import type { Routes } from '../commonTypes.js'

import { getContent } from './translateController.js'
import { translateRequestBody, translateResponseBody } from './translateSchemas.js'

export const translateRouteDefinition: Routes = [
  {
    method: 'POST',
    url: '/translate',
    handler: getContent,
    schema: {
      body: translateRequestBody,
      response: {
        200: translateResponseBody,
        403: apiError,
      },
    },
  },
]
