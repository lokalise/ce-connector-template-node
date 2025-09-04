import type {
  AuthConfig,
  EnvLocaleDefinition,
  IntegrationConfig,
} from '@lokalise/connector-api-contracts'
import { PublicNonRecoverableError } from '@lokalise/node-core'

export class EnvService {
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
