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
import { EnvService } from './env/EnvService.js'
import { PublishService } from './publish/PublishService.js'
import { TranslateService } from './translate/TranslateService.js'

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
    }
  }

  resolveControllers(): MandatoryNameAndRegistrationPair<unknown> {
    return {
      authController: asControllerClass(AuthController),
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
}
