import {
  AbstractModule,
  asControllerClass,
  asSingletonClass,
  type DependencyInjectionOptions,
  type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import type { ExternalDependencies } from '../infrastructure/CommonModule.ts'
import { FakeIntegrationApiClient } from '../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import { AuthService } from './auth/AuthService.ts'
import { AuthController } from './auth/authController.ts'
import { CacheService } from './cache/CacheService.ts'
import { CacheController } from './cache/cacheController.ts'
import { EnvService } from './env/EnvService.ts'
import { EnvController } from './env/envController.ts'
import { ItemListController } from './itemList/ItemListController.ts'
import { ItemListService } from './itemList/ItemListService.ts'
import { PublishService } from './publish/PublishService.ts'
import { PublishController } from './publish/publishController.ts'
import { TranslateService } from './translate/TranslateService.ts'
import { TranslateController } from './translate/translateController.ts'

export class ConnectorModule extends AbstractModule<ConnectorDependencies, ExternalDependencies> {
  resolveDependencies(
    _diOptions: DependencyInjectionOptions,
    _externalDependencies: ExternalDependencies,
  ) {
    return {
      fakeIntegrationApiClient: asSingletonClass(FakeIntegrationApiClient),
      cacheService: asSingletonClass(CacheService),
      authService: asSingletonClass(AuthService),
      envService: asSingletonClass(EnvService),
      translateService: asSingletonClass(TranslateService),
      publishService: asSingletonClass(PublishService),
      itemListService: asSingletonClass(ItemListService),
    }
  }

  resolveControllers(): MandatoryNameAndRegistrationPair<unknown> {
    return {
      authController: asControllerClass(AuthController),
      cacheController: asControllerClass(CacheController),
      publishController: asControllerClass(PublishController),
      itemListController: asControllerClass(ItemListController),
      translateController: asControllerClass(TranslateController),
      envController: asControllerClass(EnvController),
    }
  }
}

export interface ConnectorDependencies {
  fakeIntegrationApiClient: FakeIntegrationApiClient
  cacheService: CacheService
  authService: AuthService
  envService: EnvService
  publishService: PublishService
  translateService: TranslateService
  itemListService: ItemListService
}
