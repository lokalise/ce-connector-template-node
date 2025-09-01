import { getEnvContract } from '@lokalise/connector-api-contracts'
import { buildFastifyNoPayloadRoute } from '@lokalise/fastify-api-contracts'
import { AbstractController, type BuildRoutesReturnType } from 'opinionated-machine'
import type { ConnectorDependencies } from '../ConnectorModule.js'
import type { EnvService } from './EnvService.js'

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

  private getEnv = buildFastifyNoPayloadRoute(getEnvContract, async (req, reply) => {
    const localeData = await this.envService.getLocales(req.integrationConfig, req.authConfig)
    if (!localeData) {
      await reply.status(403).send({
        // @ts-expect-error ToDo check if correct types could be enforced on opinionated-machine side for errors
        message: 'Could not retrieve locales from 3rd party.',
        statusCode: 403,
      })
      return
    }

    const cacheItemStructure = await this.envService.getCacheItemStructure(
      req.integrationConfig,
      req.authConfig,
    )

    await reply.send({
      ...localeData,
      cacheItemStructure,
    })
  })

  buildRoutes(): BuildRoutesReturnType<EnvControllerContractsType> {
    return {
      getEnv: this.getEnv,
    }
  }
}
