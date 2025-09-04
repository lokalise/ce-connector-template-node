import { getEnvContract } from '@lokalise/connector-api-contracts'
import { buildFastifyNoPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import { PROTECTED_ROUTE_METADATA_MAPPER } from '../../prehandlers/integrationConfigPrehandler.ts'
import type { ConnectorDependencies } from '../ConnectorModule.ts'
import type { EnvService } from './EnvService.ts'

type EnvControllerContractsType = typeof EnvController.contracts

export class EnvController extends AbstractController<EnvControllerContractsType> {
  public static contracts = {
    getEnv: getEnvContract,
  } as const

  private readonly envService: EnvService

  constructor(dependencies: ConnectorDependencies) {
    super()

    this.envService = dependencies.envService
  }

  private getEnv = buildFastifyNoPayloadRoute(
    getEnvContract,
    async (req, reply) => {
      const localeData = await this.envService.getLocales(req.integrationConfig, req.authConfig)

      const cacheItemStructure = await this.envService.getCacheItemStructure(
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
