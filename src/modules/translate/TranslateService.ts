import type { AuthConfig, ContentItem, IntegrationConfig, ItemIdentifiers } from '../../types'

export class TranslateService {
  async getContent(
    config: IntegrationConfig,
    auth: AuthConfig,
    locales: string[],
    ids: ItemIdentifiers[],
    // Default locale might not be needed for integration logic
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultLocale: string,
  ): Promise<[ContentItem[] | undefined, ItemIdentifiers[]]> {
    // implementation
    return Promise.resolve([[], []])
  }
}
