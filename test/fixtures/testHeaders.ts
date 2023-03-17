import { AUTH_HEADER, CONFIG_HEADER } from '../../src/plugins/integrationConfigPlugin'
import type { AuthConfig, IntegrationConfig } from '../../src/types'
import { encodeBase64 } from '../../src/utils/base64Utils'

export function createTestRequestHeaders(
  integrationConfig: IntegrationConfig,
  authConfig: AuthConfig,
) {
  return {
    [CONFIG_HEADER]: encodeBase64(integrationConfig),
    [AUTH_HEADER]: encodeBase64(authConfig),
  }
}
