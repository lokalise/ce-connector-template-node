import type { AuthConfig, ContentItem, IntegrationConfig, ItemIdentifiers } from '../../types.js'

export class TranslateService {
  getContent(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _locales: string[],
    _ids: ItemIdentifiers[],
    // Default locale might not be needed for integration logic
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _defaultLocale: string,
  ): Promise<[ContentItem[] | undefined, ItemIdentifiers[]]> {
    // implementation
    return Promise.resolve([[], []])
  }
}
