import type { AuthConfig, ContentItem, IntegrationConfig, ItemIdentifiers } from '../../types'

export class PublishService {
  async publishContent(
    config: IntegrationConfig,
    auth: AuthConfig,
    items: ContentItem[],
    // Default locale might not be needed for integration logic
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultLocale: string,
  ): Promise<[boolean | undefined, ItemIdentifiers[]]> {
    // implementation

    return Promise.resolve([true, []])
  }
}
