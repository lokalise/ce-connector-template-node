import type { itemListEntry } from '@lokalise/connector-api-contracts'
import { PublicNonRecoverableError } from '@lokalise/node-core'
import type { z } from 'zod/v4'
import type { ItemListService } from '../../adapter-common/types/AdapterTypes.js'
import type { AuthConfig, IntegrationConfig } from '../TemplateAdapter.js'

export type ItemList = z.infer<typeof itemListEntry>[]
export type ItemListResult = {
  items: ItemList
  totalCount: number
  hasMore: boolean
  cursor: string
}

// Replace "Template" with the name of the integration
export class TemplateItemListService implements ItemListService<IntegrationConfig, AuthConfig> {
  getItemList(_config: IntegrationConfig, _auth: AuthConfig): Promise<ItemListResult> {
    // implementation

    // biome-ignore lint/correctness/noConstantCondition: to be replaced with real implementation
    if (false) {
      throw new PublicNonRecoverableError({
        message: 'Could not list content items',
        errorCode: 'FAILED_TO_LIST_CONTENT',
        httpStatusCode: 500,
        details: {
          errors: [],
        },
      })
    }

    return Promise.resolve({
      items: [],
      totalCount: 0,
      hasMore: false,
      cursor: 'placeholder',
    })
  }
}
