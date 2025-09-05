import type { PostAuthResponseRequestBody } from '@lokalise/connector-api-contracts'
import { ThirdPartyAuthenticationError } from '../../../infrastructure/errors/publicErrors.js'
import type { FakeIntegrationApiClient } from '../../../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import type {
  AuthServiceAPIKey,
  AuthServiceOAuth,
} from '../../adapter-common/types/AdapterTypes.js'
import type { AuthConfig, IntegrationConfig } from '../TemplateAdapter.js'
import type { TemplateDependencies } from '../TemplateAdapterModule.ts'

// Placeholder, may change depending on the integration
export type AuthResult = {
  key: string
}

// Placeholder, may change depending on the integration
export type AuthCredentials = {
  accessToken: string
  expiresIn: number
  refreshToken: string
}

export type AuthorizationUrl = {
  url: string
}

// Replace "Template" with the name of the integration
export class TemplateAuthService
  // Real service is typically only going to implement one of these
  implements
    AuthServiceOAuth<IntegrationConfig, AuthCredentials>,
    AuthServiceAPIKey<IntegrationConfig, AuthConfig, AuthResult>
{
  supportsApiToken = true as const
  supportsOAuth = true as const
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: this is just an example
  private readonly _fakeApiClient: FakeIntegrationApiClient
  constructor({ fakeIntegrationApiClient }: TemplateDependencies) {
    this._fakeApiClient = fakeIntegrationApiClient
  }

  /**
   * Generate the authorization URL for the given integration configuration (OAuth flow only).
   * @param _config
   */
  generateAuthorizationUrl(_config: IntegrationConfig): Promise<string> {
    // TODO: implementation
    // response structure depends on auth strategy and platform specificity
    return Promise.resolve('https://example.io')
  }

  /**
   * Returns credentials for the given auth data (OAuth flow only).
   * @param _authData
   */
  getAuthCredentials(_authData: PostAuthResponseRequestBody): Promise<AuthCredentials> {
    // TODO: implementation
    return Promise.resolve({
      accessToken: 'accessToken',
      expiresIn: 2000,
      refreshToken: 'refreshToken',
    })
  }

  /**
   * Validate provided auth integration configuration (apiToken flow only).
   * @param _config
   */
  validate(_config: IntegrationConfig): Promise<AuthResult> {
    // TODO: implementation
    // response structure depends on the integration

    // biome-ignore lint/correctness/noConstantCondition: to be replaced with real implementation
    if (false) {
      throw new ThirdPartyAuthenticationError({
        message: 'Could not authenticate to 3rd party using the provided key.',
      })
    }

    return Promise.resolve({
      key: 'apiKey',
    })
  }

  /**
   * Refreshes the auth token (apiToken flow only).
   * @param _config
   * @param _auth
   */
  refresh(_config: IntegrationConfig, _auth: AuthConfig): Promise<AuthResult> {
    // TODO: implementation

    // response structure depends on auth strategy and specific integration
    return Promise.resolve({
      key: 'apiKey',
    })
  }
}
