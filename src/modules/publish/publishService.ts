import type { AuthConfig, ContentItem, IntegrationConfig, ItemIdentifiers } from '../../types'

const publishContent = async (
  config: IntegrationConfig,
  auth: AuthConfig,
  items: ContentItem[],
  // Default locale might not be needed for integration logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultLocale: string,
): Promise<[boolean | undefined, ItemIdentifiers[]]> => {
  // implementation

  return Promise.resolve([undefined, []])
}

const translateService = {
  publishContent,
}

export default translateService
