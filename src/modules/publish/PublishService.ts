import type { Either } from '@lokalise/node-core'
import type { AuthConfig, ContentItem, IntegrationConfig, ItemIdentifiers } from '../../types.ts'

export class PublishService {
  /**
   * Returns true if all items were published successfully, false and a list of failed item identifiers otherwise.
   * @param _config
   * @param _auth
   * @param _items
   * @param _defaultLocale
   */
  publishContent(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _items: ContentItem[],
    // Default locale might not be needed for integration logic
    _defaultLocale: string,
  ): Promise<Either<ItemIdentifiers[], true>> {
    // implementation

    // biome-ignore lint/correctness/noConstantCondition: to be replaced with real implementation
    if (false) {
      return Promise.resolve({
        error: [], // ids with errors
      })
    }

    return Promise.resolve({
      result: true,
    })
  }
}
