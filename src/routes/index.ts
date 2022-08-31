import type { RouteOptions } from 'fastify'

import authRouteDefinition from './auth'
import cacheRouteDefinition from './cache'
import envRouteDefinition from './env'
import publishRouteDefinition from './publish'
import translateRouteDefinition from './translate'

const routeDefinitions = {
  schemas: [
    ...authRouteDefinition.schemas,
    ...envRouteDefinition.schemas,
    ...cacheRouteDefinition.schemas,
    ...translateRouteDefinition.schemas,
    ...publishRouteDefinition.schemas,
  ],
  routes: [
    ...authRouteDefinition.routes,
    ...envRouteDefinition.routes,
    ...cacheRouteDefinition.routes,
    ...translateRouteDefinition.routes,
    ...publishRouteDefinition.routes,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  ] as RouteOptions<any, any, any, any>[],
}

export default routeDefinitions
