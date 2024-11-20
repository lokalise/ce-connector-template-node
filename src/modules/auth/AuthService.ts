import type { PostAuthResultRequestPayload } from 'src/modules/auth/authTypes'
import type { AuthConfig, IntegrationConfig } from 'src/types'

import type { Dependencies } from '../../infrastructure/diConfig'
import type { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient'

export class AuthService {
  private readonly fakeApiClient: FakeIntegrationApiClient
  constructor({ fakeIntegrationApiClient }: Dependencies) {
    this.fakeApiClient = fakeIntegrationApiClient
  }

  // API key flow
  async validate(_config: IntegrationConfig) {
    // TODO: implementation
    // response structure depends on platform specificity
    return Promise.resolve({
      key: 'apiKey',
    })
  }

  // OAuth flow
  async generateAuthorizationUrl(_config: IntegrationConfig) {
    // TODO: implementation
    // response structure depends on auth strategy and platform specificity
    return Promise.resolve({
      url: 'https://example.io',
    })
  }

  async refresh(_config: IntegrationConfig, _auth: AuthConfig) {
    // TODO: implementation
    // response structure depends on auth strategy and platform specificity
    return Promise.resolve({
      key: 'apiKey',
    })
  }

  async getAuthCredentials(_authData: PostAuthResultRequestPayload) {
    // TODO: implementation
    return Promise.resolve({
      accessToken: 'accessToken',
      expiresIn: 2000,
      refreshToken: 'refreshToken',
    })
  }
}
