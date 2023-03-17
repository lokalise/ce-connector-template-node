import type { AwilixContainer, Resolver } from 'awilix'
import { asClass, asFunction, Lifetime } from 'awilix'
import type { FastifyInstance } from 'fastify'
import type P from 'pino'

import { FakeIntegrationApiClient } from '../integrations/fakeIntegration/client/FakeIntegrationApiClient'
import { CacheService } from '../modules/cache/CacheService'

import type { Config } from './config'
import { getConfig } from './config'

export type ExternalDependencies = {
  app?: FastifyInstance
  logger?: P.Logger
}
export const SINGLETON_CONFIG = { lifetime: Lifetime.SINGLETON }

export type DependencyOverrides = Partial<DiConfig>

export function registerDependencies(
  diContainer: AwilixContainer,
  dependencies: ExternalDependencies = {},
  dependencyOverrides: DependencyOverrides = {},
): void {
  const diConfig: DiConfig = {
    config: asFunction(() => {
      return getConfig()
    }, SINGLETON_CONFIG),
    fakeIntegrationApiClient: asClass(FakeIntegrationApiClient, SINGLETON_CONFIG),
    cacheService: asClass(CacheService, SINGLETON_CONFIG),
  }
  diContainer.register(diConfig)

  for (const [dependencyKey, dependencyValue] of Object.entries(dependencyOverrides)) {
    diContainer.register(dependencyKey, dependencyValue)
  }
}

type DiConfig = Record<keyof Dependencies, Resolver<unknown>>

export interface Dependencies {
  config: Config
  fakeIntegrationApiClient: FakeIntegrationApiClient
  cacheService: CacheService
}

declare module '@fastify/awilix' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Cradle extends Dependencies {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RequestCradle extends Dependencies {}
}
