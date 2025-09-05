import {
  postAuthContract,
  postAuthRefreshContract,
  postAuthResponseContract,
} from '@lokalise/connector-api-contracts'
import { buildFastifyPayloadRoute } from '@lokalise/fastify-api-contracts'
import { InternalError } from '@lokalise/node-core'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import {
  ApiTokenNotSupportedError,
  OAuthNotSupportedError,
} from '../../../infrastructure/errors/publicErrors.js'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../../prehandlers/integrationConfigPrehandler.ts'
import type { Adapter } from '../../adapter-common/types/AdapterTypes.js'
import type {
  ConnectorShellInjectableDependencies,
  SupportedConnectors,
} from '../ConnectorShellModule.js'

type AuthControllerContractsType = typeof AuthController.contracts

export class AuthController extends AbstractController<AuthControllerContractsType> {
  public static contracts = {
    postAuth: postAuthContract,
    postAuthRefresh: postAuthRefreshContract,
    postAuthResponse: postAuthResponseContract,
  } as const

  private readonly adapters: Record<SupportedConnectors, Adapter>

  constructor(dependencies: ConnectorShellInjectableDependencies) {
    super()

    this.adapters = dependencies.adapters
  }

  private postAuth = buildFastifyPayloadRoute(postAuthContract, async (req, reply) => {
    if (this.adapters.template.authServiceAPIKey) {
      const authConfig = await this.adapters.template.authServiceAPIKey.validate(
        req.integrationConfig,
      )
      return reply.send(authConfig)
    }

    if (this.adapters.template.authServiceOAuth) {
      const authorizationUrl =
        await this.adapters.template.authServiceOAuth.generateAuthorizationUrl(
          req.integrationConfig,
        )
      return reply.send({
        url: authorizationUrl,
      })
    }

    throw new InternalError({
      message: 'No auth service defined for connector',
      errorCode: 'NO_AUTH_SERVICE_DEFINED',
      details: {
        connectorName: this.adapters.template.getConnectorName(),
      },
    })
  })

  private postAuthRefresh = buildFastifyPayloadRoute(
    postAuthRefreshContract,
    async (req, reply) => {
      const resolvedAuthService = this.adapters.template.authServiceAPIKey
      if (!resolvedAuthService) {
        throw new ApiTokenNotSupportedError(this.adapters.template.getConnectorName())
      }
      const authConfig = await resolvedAuthService.refresh(req.integrationConfig, req.authConfig)

      if (!authConfig) {
        await reply.status(403).send({
          message: 'Could not authenticate to 3rd party using the provided key.',
          statusCode: 403,
        })
        return
      }

      return reply.send(authConfig)
    },
    PROTECTED_ROUTE_METADATA_MAPPER,
  )

  private postAuthResponse = buildFastifyPayloadRoute(
    postAuthResponseContract,
    async (req, reply) => {
      const resolvedAuthService = this.adapters.template.authServiceOAuth
      if (!resolvedAuthService) {
        throw new OAuthNotSupportedError(this.adapters.template.getConnectorName())
      }

      const credentials = await resolvedAuthService.getAuthCredentials(req.body)

      if (!credentials) {
        await reply.status(403).send({
          message: 'Authorization failed',
          errorCode: 403,
        })
        return
      }

      return reply.send(credentials)
    },
  )

  buildRoutes(): BuildRoutesReturnType<AuthControllerContractsType> {
    return {
      postAuth: this.postAuth,
      postAuthRefresh: this.postAuthRefresh,
      postAuthResponse: this.postAuthResponse,
    }
  }
}
