import { authRouteDefinition } from './auth/authRoutes.js'
import { cacheRouteDefinition } from './cache/cacheRoutes.js'
import { envRouteDefinition } from './env/envRoutes.js'
import { publishRouteDefinition } from './publish/publishRoutes.js'
import { translateRouteDefinition } from './translate/translateRoutes.js'

export const routeDefinitions = {
  routes: [
    ...authRouteDefinition,
    ...envRouteDefinition,
    ...cacheRouteDefinition,
    ...translateRouteDefinition,
    ...publishRouteDefinition,
  ],
}
