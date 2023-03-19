import type { Routes } from '../commonTypes'

import { publishContent } from './publishController'
import { publishRequestBody, publishResponseBody } from './publishSchemas'

export const publishRouteDefinition: Routes = [
  {
    method: 'POST',
    url: '/publish',
    handler: publishContent,
    schema: {
      body: publishRequestBody,
      response: {
        200: publishResponseBody,
      },
    },
  },
]
