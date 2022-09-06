import { apiError } from '../schema'
import type { Routes } from '../types'

import translateController from './controller'
import { translateRequestBody, translateResponseBody } from './schema'

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
