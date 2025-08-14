import type { Routes } from '../commonTypes.ts'

import { publishContent } from './publishController.ts'
import { publishRequestBody, publishResponseBody } from './publishSchemas.ts'

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
