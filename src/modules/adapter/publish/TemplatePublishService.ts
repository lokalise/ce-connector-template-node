import type { ContentItem, ItemIdentifier } from '@lokalise/connector-api-contracts'
import type { Either } from '@lokalise/node-core'
import type { PublishService } from '../../adapter-common/types/AdapterTypes.js'
import type { AuthConfig, IntegrationConfig } from '../TemplateAdapter.js'

// Replace "Template" with the name of the integration
export class TemplatePublishService implements PublishService<IntegrationConfig, AuthConfig> {
  /**
   * Export data from Lokalise to the integration.
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
  ): Promise<Either<ItemIdentifier[], true>> {
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
