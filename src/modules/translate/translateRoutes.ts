import { apiError } from '../commonSchemas'
import type { Routes } from '../commonTypes'

import { getContent } from './translateController'
import { translateRequestBody, translateResponseBody } from './translateSchemas'

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
