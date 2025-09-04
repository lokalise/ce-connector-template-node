import type {
  AuthConfig,
  CONNECTOR_REQUEST_HEADERS_SCHEMA,
  IntegrationConfig,
} from '@lokalise/connector-api-contracts'
import type { z } from 'zod/v4'
import { encodeBase64 } from '../../src/utils/base64Utils.ts'

export function createTestRequestHeaders(
  integrationConfig: IntegrationConfig,
  authConfig: AuthConfig,
): z.output<typeof CONNECTOR_REQUEST_HEADERS_SCHEMA> {
  return {
    'ce-config': encodeBase64(integrationConfig),
    'ce-auth': encodeBase64(authConfig),
  }
}
