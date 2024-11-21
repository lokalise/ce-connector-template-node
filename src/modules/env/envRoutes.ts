import { apiError } from '../commonSchemas.js'
import type { Routes } from '../commonTypes.js'

import { getEnv } from './envController.js'
import { envResponseBody } from './envSchemas.js'

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
