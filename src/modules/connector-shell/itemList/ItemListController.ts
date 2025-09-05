import { getItemListContract } from '@lokalise/connector-api-contracts'
import { buildFastifyNoPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../../prehandlers/integrationConfigPrehandler.ts'
import type { Adapter } from '../../adapter-common/types/AdapterTypes.ts'
import type {
  ConnectorShellInjectableDependencies,
  SupportedConnectors,
} from '../ConnectorShellModule.ts'

type ItemListControllerContractsType = typeof ItemListController.contracts

export class ItemListController extends AbstractController<ItemListControllerContractsType> {
  public static contracts = {
    getItemList: getItemListContract,
  } as const
  private readonly adapters: Record<SupportedConnectors, Adapter>

  constructor(dependencies: ConnectorShellInjectableDependencies) {
    super()

    this.adapters = dependencies.adapters
  }

  private getItemList = buildFastifyNoPayloadRoute(
    getItemListContract,
    async (req, reply) => {
      const itemListResult = await this.adapters.template.itemListService.getItemList(
        req.integrationConfig,
        req.authConfig,
      )

      await reply.send({
        data: itemListResult.items,
        meta: {
          cursor: itemListResult.cursor,
          hasMore: itemListResult.hasMore,
          count: itemListResult.totalCount,
        },
      })
    },
    PROTECTED_ROUTE_METADATA_MAPPER,
  )

  buildRoutes(): BuildRoutesReturnType<ItemListControllerContractsType> {
    return {
      getItemList: this.getItemList,
    }
  }
}
