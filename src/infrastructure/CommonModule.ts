import type { TransactionObservabilityManager } from '@lokalise/node-core'
import type { NameAndRegistrationPair } from 'awilix'
import type { AwilixManager } from 'awilix-manager'
import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import {
  AbstractModule,
  asSingletonFunction,
  type DependencyInjectionOptions,
  type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import type { TemplateDependencies } from '../modules/adapter/TemplateAdapterModule.ts'
import { type Config, getConfig } from './config.ts'

export type ExternalDependencies = {
  app?: FastifyInstance
  logger?: FastifyBaseLogger
}

export type Dependencies = CommonDependencies & TemplateDependencies
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
      awilixManager: asSingletonFunction(() => {
        if (!externalDependencies.app?.awilixManager) {
          throw new Error('awilix-manager is not set')
        }
        return externalDependencies.app?.awilixManager
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
  awilixManager: AwilixManager
}

declare module '@fastify/awilix' {
  interface Cradle extends Dependencies {}
  interface RequestCradle extends Dependencies {}
}
