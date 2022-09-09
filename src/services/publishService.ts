import type { AuthConfig, ContentItem, IntegrationConfig } from '../types'

const publishContent = async (
  config: IntegrationConfig,
  auth: AuthConfig,
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
