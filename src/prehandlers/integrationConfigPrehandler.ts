import type {
  CONNECTOR_REQUEST_HEADERS_SCHEMA,
  CONNECTOR_REQUEST_HEADERS_SCHEMA_PRE_SETUP,
} from '@lokalise/connector-api-contracts'
import type { ApiContractMetadataToRouteMapper } from '@lokalise/fastify-api-contracts'
import { PublicNonRecoverableError } from '@lokalise/node-core'
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import type { z } from 'zod/v4'
import { decodeBase64 } from '../utils/base64Utils.ts'

export const PROTECTED_ROUTE_METADATA_MAPPER = (() => {
  return {
    preHandler: createIntegrationConfigPrehandler(),
  }
}) satisfies ApiContractMetadataToRouteMapper

export function createIntegrationConfigPrehandler() {
  return (
    req: FastifyRequest<{
      Headers:
        | z.infer<typeof CONNECTOR_REQUEST_HEADERS_SCHEMA>
        | z.infer<typeof CONNECTOR_REQUEST_HEADERS_SCHEMA_PRE_SETUP>
    }>,
    _res: FastifyReply,
    done: HookHandlerDoneFunction,
  ) => {
    // Integration configuration
    const integrationConfigHeaderData = req.headers['ce-config']
    if (integrationConfigHeaderData) {
      const integrationConfigDecoded = decodeBase64(integrationConfigHeaderData)
      if (!integrationConfigDecoded) {
        return done(
          new PublicNonRecoverableError({
            errorCode: '401',
            message: 'Invalid configuration data provided',
          }),
        )
      }
      req.integrationConfig = integrationConfigDecoded
    }

    // Auth configuration
    const authConfigHeaderData = req.headers['ce-auth']
    if (!authConfigHeaderData) {
      return done(
        new PublicNonRecoverableError({
          errorCode: '401',
          message: 'Authorization data not provided',
        }),
      )
    }
    if (Array.isArray(authConfigHeaderData)) {
      return done(
        new PublicNonRecoverableError({
          errorCode: '401',
          message: 'Authorization data must not be an array',
        }),
      )
    }

    const authConfigDecoded = decodeBase64(authConfigHeaderData)
    if (!authConfigDecoded) {
      return done(
        new PublicNonRecoverableError({
          errorCode: '400',
          message: 'Invalid authorization data provided',
        }),
      )
    }

    req.authConfig = authConfigDecoded

    return done()
  }
}
