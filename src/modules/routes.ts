import { authRouteDefinition } from './auth/authRoutes'
import { cacheRouteDefinition } from './cache/cacheRoutes'
import { envRouteDefinition } from './env/envRoutes'
import { publishRouteDefinition } from './publish/publishRoutes'
import { translateRouteDefinition } from './translate/translateRoutes'

export const routeDefinitions = {
  routes: [
    ...authRouteDefinition,
    ...envRouteDefinition,
    ...cacheRouteDefinition,
    ...translateRouteDefinition,
    ...publishRouteDefinition,
  ],
}
