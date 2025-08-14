import type { Dependencies } from '../../infrastructure/diConfig.ts'
import { CouldNotRetrieveCacheItemsError } from '../../infrastructure/errors/publicErrors.ts'
import type { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import type { AuthConfig, IntegrationConfig, ItemIdentifiers } from '../../types.ts'

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
