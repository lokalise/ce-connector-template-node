import { apiError } from '../schema'
import type { Routes } from '../types'

import envController from './controller'
import { envResponseBody } from './schema'

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
