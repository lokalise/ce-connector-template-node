import { postPublishContract } from '@lokalise/connector-api-contracts'
import { buildFastifyPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../prehandlers/integrationConfigPrehandler.ts'
import type { ConnectorDependencies } from '../ConnectorModule.ts'
import type { PublishService } from './PublishService.ts'

type PublishControllerContractsType = typeof PublishController.contracts

export class PublishController extends AbstractController<PublishControllerContractsType> {
  public static contracts = {
    postPublishContract: postPublishContract,
  } as const

  private readonly publishService: PublishService

  constructor(dependencies: ConnectorDependencies) {
    super()

    this.publishService = dependencies.publishService
  }

  private postPublishContent = buildFastifyPayloadRoute(
    postPublishContract,
    async (req, reply) => {
      const [publishResult] = await this.publishService.publishContent(
        req.integrationConfig,
        req.authConfig,
        req.body.items,
        req.body.defaultLocale,
      )
      if (!publishResult) {
        await reply.status(403).send({
          message: 'Could not publish content',
          statusCode: 403,
          payload: {
            message: 'Could not publish content',
            errorCode: 'INVALID_CREDENTIALS',
            details: {
              errors: [],
            },
          },
        })
        return
      }

      await reply.send({
        statusCode: 200,
        message: 'Content successfully updated',
      })
    },
    PROTECTED_ROUTE_METADATA_MAPPER,
  )

  buildRoutes(): BuildRoutesReturnType<PublishControllerContractsType> {
    return {
      postPublishContract: this.postPublishContent,
    }
  }
}
