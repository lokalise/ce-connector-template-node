import { cacheRouteDefinition } from './cache/cacheRoutes.ts'
import { envRouteDefinition } from './env/envRoutes.ts'

export const routeDefinitions = {
  routes: [...envRouteDefinition, ...cacheRouteDefinition],
}
