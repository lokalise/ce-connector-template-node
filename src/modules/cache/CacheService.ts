import type { Dependencies } from '../../infrastructure/diConfig.js'
import { CouldNotRetrieveCacheItemsError } from '../../infrastructure/errors/publicErrors.js'
import type { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient.js'
import type { AuthConfig, IntegrationConfig, ItemIdentifiers } from '../../types.js'

export class CacheService {
  private readonly fakeApiClient: FakeIntegrationApiClient
  constructor({ fakeIntegrationApiClient }: Dependencies) {
    this.fakeApiClient = fakeIntegrationApiClient
  }

  async listItems(_config: IntegrationConfig, _auth: AuthConfig): Promise<ItemIdentifiers[]> {
    const items = await this.fakeApiClient.listItems()

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

  async getItems(_config: IntegrationConfig, _auth: AuthConfig, _ids: ItemIdentifiers[]) {
    const items = await Promise.resolve(undefined)

    if (!items) {
      throw new CouldNotRetrieveCacheItemsError()
    }

    return items
  }
}
