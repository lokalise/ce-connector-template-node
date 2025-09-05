import { getCacheContract, postCacheItemsContract } from '@lokalise/connector-api-contracts'
import {
  buildFastifyNoPayloadRoute,
  buildFastifyPayloadRoute,
} from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../../prehandlers/integrationConfigPrehandler.ts'
import type { Adapter } from '../../adapter-common/types/AdapterTypes.js'
import type {
  ConnectorShellInjectableDependencies,
  SupportedConnectors,
} from '../ConnectorShellModule.js'

type CacheControllerContractsType = typeof CacheController.contracts

export class CacheController extends AbstractController<CacheControllerContractsType> {
  public static contracts = {
    getCache: getCacheContract,
    postCacheItems: postCacheItemsContract,
  } as const

  private readonly adapters: Record<SupportedConnectors, Adapter>

  constructor(dependencies: ConnectorShellInjectableDependencies) {
    super()

    this.adapters = dependencies.adapters
  }

  private getCache = buildFastifyNoPayloadRoute(
    getCacheContract,
    async (req, reply) => {
      const items = await this.adapters.template.cacheService.listItems(
        req.integrationConfig,
        req.authConfig,
      )

      await reply.send({
        items,
      })
    },
    PROTECTED_ROUTE_METADATA_MAPPER,
  )

  private getCacheItems = buildFastifyPayloadRoute(
    postCacheItemsContract,
    async (req, reply) => {
      const items = await this.adapters.template.cacheService.getItems(
        req.integrationConfig,
        req.authConfig,
        req.body.items,
      )

      await reply.send({
        items,
      })
    },
    PROTECTED_ROUTE_METADATA_MAPPER,
  )

  buildRoutes(): BuildRoutesReturnType<CacheControllerContractsType> {
    return {
      getCache: this.getCache,
      postCacheItems: this.getCacheItems,
    }
  }
}
