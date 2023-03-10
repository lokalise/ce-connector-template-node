import { apiError } from '../commonSchemas'
import type { Routes } from '../commonTypes'

import envController from './envController'
import { envResponseBody } from './envSchemas'

const envRouteDefinition: Routes = [
  {
    method: 'GET',
    url: '/env',
    handler: envController.getEnv,
    schema: {
      response: {
        200: envResponseBody,
        403: apiError,
      },
    },
  },
]

export default envRouteDefinition
