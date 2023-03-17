import type { Dependencies } from '../../infrastructure/diConfig'
import { CouldNotRetrieveCacheItemsError } from '../../infrastructure/errors/publicErrors'
import type { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient'
import type { AuthConfig, IntegrationConfig, ItemIdentifiers } from '../../types'

export class CacheService {
  private readonly fakeApiClient: FakeIntegrationApiClient
  constructor({ fakeIntegrationApiClient }: Dependencies) {
    this.fakeApiClient = fakeIntegrationApiClient
  }

  async listItems(config: IntegrationConfig, auth: AuthConfig): Promise<ItemIdentifiers[]> {
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

  async getItems(config: IntegrationConfig, auth: AuthConfig, ids: ItemIdentifiers[]) {
    const items = await Promise.resolve(undefined)

    if (!items) {
      throw new CouldNotRetrieveCacheItemsError()
    }

    return items
  }
}
