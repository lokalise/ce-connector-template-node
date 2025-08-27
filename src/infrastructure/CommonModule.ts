import type { TransactionObservabilityManager } from '@lokalise/node-core'
import type { NameAndRegistrationPair } from 'awilix'
import type { FastifyBaseLogger, FastifyInstance } from 'fastify'
import {
  AbstractModule,
  asSingletonClass,
  asSingletonFunction,
  type DependencyInjectionOptions,
  type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import { FakeIntegrationApiClient } from '../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import { AuthService } from '../modules/auth/AuthService.ts'
import { CacheService } from '../modules/cache/CacheService.ts'
import { EnvService } from '../modules/env/EnvService.ts'
import { PublishService } from '../modules/publish/PublishService.ts'
import { TranslateService } from '../modules/translate/TranslateService.ts'
import { type Config, getConfig } from './config.ts'

export type ExternalDependencies = {
  app?: FastifyInstance
  logger?: FastifyBaseLogger
}

export type DependencyOverrides = Partial<DiConfig>

export class CommonModule extends AbstractModule<Dependencies, ExternalDependencies> {
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

      fakeIntegrationApiClient: asSingletonClass(FakeIntegrationApiClient),
      cacheService: asSingletonClass(CacheService),
      authService: asSingletonClass(AuthService),
      envService: asSingletonClass(EnvService),
      translateService: asSingletonClass(TranslateService),
      publishService: asSingletonClass(PublishService),
    }
  }

  resolveControllers(): MandatoryNameAndRegistrationPair<unknown> {
    return {}
  }
}

type DiConfig = NameAndRegistrationPair<Dependencies>

export interface Dependencies {
  config: Config
  transactionObservabilityManager: TransactionObservabilityManager
  fakeIntegrationApiClient: FakeIntegrationApiClient
  cacheService: CacheService
  authService: AuthService
  envService: EnvService
  publishService: PublishService
  translateService: TranslateService
}

declare module '@fastify/awilix' {
  interface Cradle extends Dependencies {}
  interface RequestCradle extends Dependencies {}
}
