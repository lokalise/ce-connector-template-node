import { cacheRouteDefinition } from './cache/cacheRoutes.ts'
import { envRouteDefinition } from './env/envRoutes.ts'
import { publishRouteDefinition } from './publish/publishRoutes.ts'
import { translateRouteDefinition } from './translate/translateRoutes.ts'

export const routeDefinitions = {
  routes: [
    ...envRouteDefinition,
    ...cacheRouteDefinition,
    ...translateRouteDefinition,
    ...publishRouteDefinition,
  ],
}
