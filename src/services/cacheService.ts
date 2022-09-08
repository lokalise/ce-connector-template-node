import type { AuthConfig, IntegrationConfig, ItemIdentifiers } from '../types'

const listItems = async (config: IntegrationConfig, auth: AuthConfig) => {
  // TODO: implementation
  return Promise.resolve(undefined)
}

const getItems = async (config: IntegrationConfig, auth: AuthConfig, ids: ItemIdentifiers[]) => {
  // TODO: implementation
  return Promise.resolve(undefined)
}

const cacheService = {
  listItems,
  getItems,
}

export default cacheService
