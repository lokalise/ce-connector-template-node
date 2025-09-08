import type { CacheItem, ItemIdentifier } from '@lokalise/connector-api-contracts'
import { CouldNotRetrieveCacheItemsError } from '../../../infrastructure/errors/publicErrors.ts'
import type { CacheService } from '../../adapter-common/types/AdapterTypes.ts'
import type { TemplateApiClient } from '../apiClients/TemplateApiClient.js'
import type { AuthConfig, IntegrationConfig } from '../TemplateAdapter.ts'
import type { TemplateDependencies } from '../TemplateAdapterModule.ts'

// Replace "Template" with the name of the integration
export class TemplateCacheService implements CacheService<IntegrationConfig, AuthConfig> {
  private readonly templateApiClient: TemplateApiClient
  constructor({ templateApiClient }: TemplateDependencies) {
    this.templateApiClient = templateApiClient
  }

  async listItems(_config: IntegrationConfig, _auth: AuthConfig): Promise<ItemIdentifier[]> {
    const items = await this.templateApiClient.listItems()

    if (!items) {
      throw new CouldNotRetrieveCacheItemsError()
    }

    return items.map((externalItem) => {
      return {
        groupId: 'dummy',
        uniqueId: externalItem.id,
        metadata: {},
      }
    })
  }

  async getItems(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _ids: ItemIdentifier[],
  ): Promise<CacheItem[]> {
    const items = await Promise.resolve([])

    if (!items) {
      throw new CouldNotRetrieveCacheItemsError()
    }

    return items
  }
}
