import type { Routes } from '../commonTypes.js'

import { publishContent } from './publishController.js'
import { publishRequestBody, publishResponseBody } from './publishSchemas.js'

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
