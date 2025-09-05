import { getEnvContract } from '@lokalise/connector-api-contracts'
import { buildFastifyNoPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../../prehandlers/integrationConfigPrehandler.ts'
import type { Adapter } from '../../adapter-common/types/AdapterTypes.js'
import type {
  ConnectorShellInjectableDependencies,
  SupportedConnectors,
} from '../ConnectorShellModule.js'

type EnvControllerContractsType = typeof EnvController.contracts

export class EnvController extends AbstractController<EnvControllerContractsType> {
  public static contracts = {
    getEnv: getEnvContract,
  } as const

  private readonly adapters: Record<SupportedConnectors, Adapter>

  constructor(dependencies: ConnectorShellInjectableDependencies) {
    super()

    this.adapters = dependencies.adapters
  }

  private getEnv = buildFastifyNoPayloadRoute(
    getEnvContract,
    async (req, reply) => {
      const localeData = await this.adapters.template.envService.getLocales(
        req.integrationConfig,
        req.authConfig,
      )

      const cacheItemStructure = await this.adapters.template.envService.getCacheItemStructure(
        req.integrationConfig,
        req.authConfig,
      )

      await reply.send({
        ...localeData,
        cacheItemStructure,
      })
    },
    PROTECTED_ROUTE_METADATA_MAPPER,
  )

  buildRoutes(): BuildRoutesReturnType<EnvControllerContractsType> {
    return {
      getEnv: this.getEnv,
    }
  }
}
