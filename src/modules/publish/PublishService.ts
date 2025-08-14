import type { AuthConfig, ContentItem, IntegrationConfig, ItemIdentifiers } from '../../types.ts'

export class PublishService {
  publishContent(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _items: ContentItem[],
    // Default locale might not be needed for integration logic
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _defaultLocale: string,
  ): Promise<[boolean | undefined, ItemIdentifiers[]]> {
    // implementation

    return Promise.resolve([true, []])
  }
}
