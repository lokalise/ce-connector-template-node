import type { Routes } from '../commonTypes'

import publishController from './publishController'
import { publishRequestBody, publishResponseBody } from './publishSchemas'

const publishRouteDefinition: Routes = [
  {
    method: 'POST',
    url: '/publish',
    handler: publishController.publishContent,
    schema: {
      body: publishRequestBody,
      response: {
        200: publishResponseBody,
      },
    },
  },
]

export default publishRouteDefinition
