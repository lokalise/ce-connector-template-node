import type { PostAuthResponseRequestPayload } from 'src/routes/auth/types'
import type { AuthConfig, IntegrationConfig } from 'src/types'

const validate = async (config: IntegrationConfig) => {
  // TODO: implementation
  // response structure depends on auth strategy and platform specificity
  return Promise.resolve({
    key: 'apiKey',
  })
}

const refresh = async (config: IntegrationConfig, auth: AuthConfig) => {
  // TODO: implementation
  // response structure depends on auth strategy and platform specificity
  return Promise.resolve({
    key: 'apiKey',
  })
}

const getAuthCredentials = async (authData: PostAuthResponseRequestPayload) => {
  // TODO: implementation
  return Promise.resolve({
    accessToken: 'accessToken',
    expiresIn: 2000,
    refreshToken: 'refreshToken',
  })
}

const authService = {
  validate,
  refresh,
  getAuthCredentials,
}

export default authService
