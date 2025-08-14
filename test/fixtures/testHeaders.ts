import { AUTH_HEADER, CONFIG_HEADER } from '../../src/plugins/integrationConfigPlugin.ts'
import type { AuthConfig, IntegrationConfig } from '../../src/types.ts'
import { encodeBase64 } from '../../src/utils/base64Utils.ts'

export function createTestRequestHeaders(
  integrationConfig: IntegrationConfig,
  authConfig: AuthConfig,
) {
  return {
    [CONFIG_HEADER]: encodeBase64(integrationConfig),
    [AUTH_HEADER]: encodeBase64(authConfig),
  }
}
