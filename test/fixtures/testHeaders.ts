import { AUTH_HEADER, CONFIG_HEADER } from '../../src/plugins/integrationConfigPlugin.js'
import type { AuthConfig, IntegrationConfig } from '../../src/types.js'
import { encodeBase64 } from '../../src/utils/base64Utils.js'

export function createTestRequestHeaders(
  integrationConfig: IntegrationConfig,
  authConfig: AuthConfig,
) {
  return {
    [CONFIG_HEADER]: encodeBase64(integrationConfig),
    [AUTH_HEADER]: encodeBase64(authConfig),
  }
}
