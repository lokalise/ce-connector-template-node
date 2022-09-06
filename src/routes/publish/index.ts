import type { Routes } from '../types'

import publishController from './controller'
import { publishRequestBody, publishResponseBody } from './schema'

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
