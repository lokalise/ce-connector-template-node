import type { PostAuthResultRequestBody } from '@lokalise/connector-api-contracts'
import type { Dependencies } from '../../infrastructure/diConfig.ts'
import type { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import type { AuthConfig, IntegrationConfig } from '../../types.ts'

export class AuthService {
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: this is just an example
  private readonly _fakeApiClient: FakeIntegrationApiClient
  constructor({ fakeIntegrationApiClient }: Dependencies) {
    this._fakeApiClient = fakeIntegrationApiClient
  }

  // API key flow
  validate(_config: IntegrationConfig) {
    // TODO: implementation
    // response structure depends on platform specificity
    return Promise.resolve({
      key: 'apiKey',
    })
  }

  // OAuth flow
  generateAuthorizationUrl(_config: IntegrationConfig) {
    // TODO: implementation
    // response structure depends on auth strategy and platform specificity
    return Promise.resolve({
      url: 'https://example.io',
    })
  }

  refresh(_config: IntegrationConfig, _auth: AuthConfig) {
    // TODO: implementation
    // response structure depends on auth strategy and platform specificity
    return Promise.resolve({
      key: 'apiKey',
    })
  }

  getAuthCredentials(_authData: PostAuthResultRequestBody) {
    // TODO: implementation
    return Promise.resolve({
      accessToken: 'accessToken',
      expiresIn: 2000,
      refreshToken: 'refreshToken',
    })
  }
}
