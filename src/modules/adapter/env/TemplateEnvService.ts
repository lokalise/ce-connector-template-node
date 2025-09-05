import type { EnvLocaleDefinition } from '@lokalise/connector-api-contracts'
import { PublicNonRecoverableError } from '@lokalise/node-core'
import type { EnvService } from '../../adapter-common/types/AdapterTypes.ts'
import type { AuthConfig, IntegrationConfig } from '../TemplateAdapter.ts'

// Replace "Template" with the name of the integration
export class TemplateEnvService implements EnvService<IntegrationConfig, AuthConfig> {
  getLocales(_config: IntegrationConfig, _auth: AuthConfig): Promise<EnvLocaleDefinition> {
    // biome-ignore lint/correctness/noConstantCondition: to be replaced with real implementation
    if (false) {
      throw new PublicNonRecoverableError({
        errorCode: 'LOCALE_RETRIEVAL_ERROR',
        message: 'Could not retrieve locales from 3rd party.',
        httpStatusCode: 403,
      })
    }

    //TODO: implementation
    return Promise.resolve({
      defaultLocale: 'en',
      locales: [
        {
          code: 'en',
          name: 'English',
        },
      ],
    })
  }

  getCacheItemStructure(
    _config: IntegrationConfig,
    _auth: AuthConfig,
  ): Promise<Record<string, string>> {
    //TODO: implementation
    return Promise.resolve({ foo: 'bar' })
  }
}
