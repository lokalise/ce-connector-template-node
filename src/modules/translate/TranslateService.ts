import { PublicNonRecoverableError } from '@lokalise/node-core'
import type { AuthConfig, ContentItem, IntegrationConfig, ItemIdentifiers } from '../../types.ts'

export class TranslateService {
  getContent(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _locales: string[],
    _ids: ItemIdentifiers[],
    _defaultLocale: string,
  ): Promise<ContentItem[]> {
    // implementation

    // biome-ignore lint/correctness/noConstantCondition: to be replaced with real implementation
    if (false) {
      throw new PublicNonRecoverableError({
        message: 'Could not retrieve content items',
        errorCode: 'FAILED_TO_FETCH_CONTENT',
        httpStatusCode: 500,
        details: {
          errors: [],
        },
      })
    }

    return Promise.resolve([])
  }
}
