import type { ContentItem, ItemIdentifier } from '@lokalise/connector-api-contracts'
import { PublicNonRecoverableError } from '@lokalise/node-core'
import type { TranslateService } from '../../adapter-common/types/AdapterTypes.ts'
import type { AuthConfig, IntegrationConfig } from '../TemplateAdapter.ts'

export class TemplateTranslateService implements TranslateService<IntegrationConfig, AuthConfig> {
  /**
   * Fetch data from the integration for the import to Lokalise.
   * Returns a list of content items with full payload.
   * @param _config
   * @param _auth
   * @param _locales
   * @param _ids
   * @param _defaultLocale
   */
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
