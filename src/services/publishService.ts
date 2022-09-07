import type { ContentItem } from '../types'

const publishContent = async (
  accessToken: string,
  items: ContentItem[],
  // Default locale might not be needed for integration logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultLocale: string,
) => {
  // implementation
  return Promise.resolve(undefined)
}

const translateService = {
  publishContent,
}

export default translateService
