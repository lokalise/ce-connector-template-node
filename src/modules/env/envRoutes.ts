import { envResponseBody } from '@lokalise/connector-api-contracts'
import { apiError } from '../commonSchemas.ts'
import type { Routes } from '../commonTypes.ts'
import { getEnv } from './envController.ts'

export const envRouteDefinition: Routes = [
  {
    method: 'GET',
    url: '/env',
    handler: getEnv,
    schema: {
      response: {
        200: envResponseBody,
        403: apiError,
      },
    },
  },
]
