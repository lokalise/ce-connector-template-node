import { postTranslateContract } from '@lokalise/connector-api-contracts'
import { buildFastifyPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../prehandlers/integrationConfigPrehandler.ts'
import type { ConnectorDependencies } from '../ConnectorModule.ts'
import type { TranslateService } from './TranslateService.ts'

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
      const items = await this.translateService.getContent(
        req.integrationConfig,
        req.authConfig,
        req.body.locales,
        req.body.items,
        req.body.defaultLocale,
      )

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
