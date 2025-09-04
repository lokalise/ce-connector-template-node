import {
  postAuthContract,
  postAuthRefreshContract,
  postAuthResponseContract,
} from '@lokalise/connector-api-contracts'
import { buildFastifyPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../prehandlers/integrationConfigPrehandler.ts'
import type { ConnectorDependencies } from '../ConnectorModule.ts'
import type { AuthService } from './AuthService.ts'

type AuthControllerContractsType = typeof AuthController.contracts

export class AuthController extends AbstractController<AuthControllerContractsType> {
  public static contracts = {
    postAuth: postAuthContract,
    postAuthRefresh: postAuthRefreshContract,
    postAuthResponse: postAuthResponseContract,
  } as const

  private readonly authService: AuthService

  constructor(dependencies: ConnectorDependencies) {
    super()

    this.authService = dependencies.authService
  }

  private postAuth = buildFastifyPayloadRoute(postAuthContract, async (req, reply) => {
    // Api key flow: delete next line if your connector uses OAuth
    const authConfig = await this.authService.validate(req.integrationConfig)
    // OAuth flow: uncomment next line if your connect uses OAuth otherwise delete it
    // const authConfig = await authService.generateAuthorizationUrl(req.integrationConfig)

    await reply.send(authConfig)
  })

  private postAuthRefresh = buildFastifyPayloadRoute(
    postAuthRefreshContract,
    async (req, reply) => {
      const authConfig = await this.authService.refresh(req.integrationConfig, req.authConfig)

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
      const credentials = await this.authService.getAuthCredentials(req.body)

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
