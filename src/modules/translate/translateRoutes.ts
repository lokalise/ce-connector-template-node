import { translateRequestBody, translateResponseBody } from '@lokalise/connector-api-contracts'
import { apiError } from '../commonSchemas.ts'
import type { Routes } from '../commonTypes.ts'
import { getContent } from './translateController.ts'

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
