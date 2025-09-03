import type { TransactionObservabilityManager } from '@lokalise/node-core'
import type { NameAndRegistrationPair } from 'awilix'
import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import {
  AbstractModule,
  asSingletonFunction,
  type DependencyInjectionOptions,
  type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import type { ConnectorDependencies } from '../modules/ConnectorModule.ts'
import { type Config, getConfig } from './config.ts'

export type ExternalDependencies = {
  app?: FastifyInstance
  logger?: FastifyBaseLogger
}

export type Dependencies = CommonDependencies & ConnectorDependencies
type DiConfig = NameAndRegistrationPair<Dependencies>
export type DependencyOverrides = Partial<DiConfig>

export class CommonModule extends AbstractModule<CommonDependencies, ExternalDependencies> {
  resolveDependencies(
    _diOptions: DependencyInjectionOptions,
    externalDependencies: ExternalDependencies,
  ) {
    return {
      config: asSingletonFunction(() => {
        return getConfig()
      }),
      transactionObservabilityManager: asSingletonFunction(() => {
        if (!externalDependencies.app?.newrelicTransactionManager) {
          throw new Error('Observability manager is not set')
        }
        return externalDependencies.app?.newrelicTransactionManager
      }),
    }
  }

  resolveControllers(): MandatoryNameAndRegistrationPair<unknown> {
    return {}
  }
}

export interface CommonDependencies {
  config: Config
  transactionObservabilityManager: TransactionObservabilityManager
}

declare module '@fastify/awilix' {
  interface Cradle extends Dependencies {}
  interface RequestCradle extends Dependencies {}
}
