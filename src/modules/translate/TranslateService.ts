import type {
  AuthConfig,
  ContentItem,
  IntegrationConfig,
  ItemIdentifier,
} from '@lokalise/connector-api-contracts'
import { PublicNonRecoverableError } from '@lokalise/node-core'

export class TranslateService {
  getContent(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _locales: string[],
    _ids: ItemIdentifier[],
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
