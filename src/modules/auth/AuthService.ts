import type { PostAuthResponseRequestBody } from '@lokalise/connector-api-contracts'
import type { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import type { AuthConfig, IntegrationConfig } from '../../types.ts'
import type { ConnectorDependencies } from '../ConnectorModule.ts'

export class AuthService {
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: this is just an example
  private readonly _fakeApiClient: FakeIntegrationApiClient
  constructor({ fakeIntegrationApiClient }: ConnectorDependencies) {
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

  getAuthCredentials(_authData: PostAuthResponseRequestBody) {
    // TODO: implementation
    return Promise.resolve({
      accessToken: 'accessToken',
      expiresIn: 2000,
      refreshToken: 'refreshToken',
    })
  }
}
