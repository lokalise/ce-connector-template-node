import {
  AbstractModule,
  asControllerClass,
  asSingletonClass,
  type DependencyInjectionOptions,
  type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import type { ExternalDependencies } from '../infrastructure/CommonModule.js'
import { FakeIntegrationApiClient } from '../integrations/fakeIntegration/client/FakeIntegrationApiClient.js'
import { AuthService } from './auth/AuthService.js'
import { AuthController } from './auth/authController.js'
import { CacheService } from './cache/CacheService.js'
import { CacheController } from './cache/cacheController.js'
import { EnvService } from './env/EnvService.js'
import { EnvController } from './env/envController.js'
import { ItemListController } from './itemList/ItemListController.js'
import { ItemListService } from './itemList/ItemListService.js'
import { PublishService } from './publish/PublishService.js'
import { PublishController } from './publish/publishController.js'
import { TranslateService } from './translate/TranslateService.js'
import { TranslateController } from './translate/translateController.js'

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
