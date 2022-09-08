import type { AuthConfig, IntegrationConfig } from 'src/types'

const validate = async (config: IntegrationConfig) => {
  // TODO: implementation
  return Promise.resolve({
    key: 'apiKey',
  })
}

const refresh = async (config: IntegrationConfig, auth: AuthConfig) => {
  // TODO: implementation
  return Promise.resolve({
    key: 'apiKey',
  })
}

const authService = {
  validate,
  refresh,
}

export default authService
