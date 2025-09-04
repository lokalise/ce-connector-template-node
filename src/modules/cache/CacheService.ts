import type {
  AuthConfig,
  IntegrationConfig,
  ItemIdentifier,
} from '@lokalise/connector-api-contracts'
import { CouldNotRetrieveCacheItemsError } from '../../infrastructure/errors/publicErrors.ts'
import type { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import type { ConnectorDependencies } from '../ConnectorModule.ts'

export class CacheService {
  private readonly fakeApiClient: FakeIntegrationApiClient
  constructor({ fakeIntegrationApiClient }: ConnectorDependencies) {
    this.fakeApiClient = fakeIntegrationApiClient
  }

  async listItems(_config: IntegrationConfig, _auth: AuthConfig): Promise<ItemIdentifier[]> {
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

  async getItems(_config: IntegrationConfig, _auth: AuthConfig, _ids: ItemIdentifier[]) {
    const items = await Promise.resolve(undefined)

    if (!items) {
      throw new CouldNotRetrieveCacheItemsError()
    }

    return items
  }
}
