import type { ItemIdentifiers } from '../types'

const getContent = async (
  accessToken: string,
  locales: string[],
  ids: ItemIdentifiers[],
  // Default locale might not be needed for integration logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultLocale: string,
) => {
  // implementation
  return Promise.resolve(undefined)
}

const translateService = {
  getContent,
}

export default translateService
