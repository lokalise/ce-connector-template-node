import { postTranslateContract } from '@lokalise/connector-api-contracts'
import { buildFastifyPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../prehandlers/integrationConfigPrehandler.js'
import type { ConnectorDependencies } from '../ConnectorModule.js'
import type { TranslateService } from './TranslateService.js'

type TranslateControllerContractsType = typeof TranslateController.contracts

export class TranslateController extends AbstractController<TranslateControllerContractsType> {
  public static contracts = {
    postTranslate: postTranslateContract,
  } as const

  private readonly translateService: TranslateService

  constructor(dependencies: ConnectorDependencies) {
    super()

    this.translateService = dependencies.translateService
  }

  private postTranslate = buildFastifyPayloadRoute(
    postTranslateContract,
    async (req, reply) => {
      const [items] = await this.translateService.getContent(
        req.integrationConfig,
        req.authConfig,
        req.body.locales,
        req.body.items,
        req.body.defaultLocale,
      )
      if (!items) {
        await reply.status(403).send({
          statusCode: 403,
          payload: {
            message: 'Could not retrieve content items',
            errorCode: 'INVALID_CREDENTIALS',
            details: {
              errors: [],
            },
          },
        })
        return
      }

      await reply.send({ items })
    },
    PROTECTED_ROUTE_METADATA_MAPPER,
  )

  buildRoutes(): BuildRoutesReturnType<TranslateControllerContractsType> {
    return {
      postTranslate: this.postTranslate,
    }
  }
}
