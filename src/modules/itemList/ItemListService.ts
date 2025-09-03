import type { itemListEntry } from '@lokalise/connector-api-contracts'
import type { Either } from '@lokalise/node-core'
import type { z } from 'zod/v4'
import type { AuthConfig, IntegrationConfig } from '../../types.ts'

export type ItemList = z.infer<typeof itemListEntry>[]
export type ItemListResult = {
  items: ItemList
  totalCount: number
  hasMore: boolean
  cursor: string
}

export class ItemListService {
  getItemList(
    _config: IntegrationConfig,
    _auth: AuthConfig,
  ): Promise<Either<Error, ItemListResult>> {
    // implementation
    return Promise.resolve({
      result: {
        items: [],
        totalCount: 0,
        hasMore: false,
        cursor: 'placeholder',
      },
    })
  }
}
