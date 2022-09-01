import authRouteDefinition from './auth'
import cacheRouteDefinition from './cache'
import envRouteDefinition from './env'
import publishRouteDefinition from './publish'
import translateRouteDefinition from './translate'

const routeDefinitions = {
  routes: [
    ...authRouteDefinition,
    ...envRouteDefinition,
    ...cacheRouteDefinition,
    ...translateRouteDefinition,
    ...publishRouteDefinition,
  ],
}

export default routeDefinitions
