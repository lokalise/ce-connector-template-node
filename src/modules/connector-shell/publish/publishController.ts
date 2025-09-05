import { postPublishContract } from '@lokalise/connector-api-contracts'
import { buildFastifyPayloadRoute } from '@lokalise/fastify-api-contracts'
import { PublicNonRecoverableError } from '@lokalise/node-core'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../../prehandlers/integrationConfigPrehandler.ts'
import type { Adapter } from '../../adapter-common/types/AdapterTypes.js'
import type {
  ConnectorShellInjectableDependencies,
  SupportedConnectors,
} from '../ConnectorShellModule.js'

type PublishControllerContractsType = typeof PublishController.contracts

export class PublishController extends AbstractController<PublishControllerContractsType> {
  public static contracts = {
    postPublishContract: postPublishContract,
  } as const
  private readonly adapters: Record<SupportedConnectors, Adapter>

  constructor(dependencies: ConnectorShellInjectableDependencies) {
    super()

    this.adapters = dependencies.adapters
  }

  private postPublishContent = buildFastifyPayloadRoute(
    postPublishContract,
    async (req, reply) => {
      const publishResult = await this.adapters.template.publishService.publishContent(
        req.integrationConfig,
        req.authConfig,
        req.body.items,
        req.body.defaultLocale,
      )

      if (publishResult.error) {
        throw new PublicNonRecoverableError({
          message: 'Could not publish content',
          httpStatusCode: 500,
          errorCode: 'PUBLISHING_ERROR',
          details: {
            erroredItemIdentifiers: publishResult.error,
          },
        })
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
