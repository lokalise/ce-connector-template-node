import { publishRequestBody, publishResponseBody } from '@lokalise/connector-api-contracts'
import type { Routes } from '../commonTypes.ts'
import { publishContent } from './publishController.ts'

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
