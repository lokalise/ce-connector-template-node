import type { ItemIdentifiers } from '../types'

const listItems = async (accessToken: string) => {
  // TODO: implementation
  return Promise.resolve(undefined)
}

const getItems = async (accessToken: string, ids: ItemIdentifiers[]) => {
  // TODO: implementation
  return Promise.resolve(undefined)
}

const cacheService = {
  listItems,
  getItems,
}

export default cacheService
