import type { PostAuthRequestPayload } from 'src/routes/auth/types'
import type { AuthConfig, IntegrationConfig } from 'src/types'

const validate = async (config: IntegrationConfig) => {
  // TODO: implementation
  return Promise.resolve(undefined)
}

const refresh = async (config: IntegrationConfig, auth: AuthConfig) => {
  // TODO: implementation
  return Promise.resolve(undefined)
}

const authService = {
  validate,
  refresh,
}

export default authService
