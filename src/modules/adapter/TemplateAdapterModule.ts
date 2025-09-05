import {
  AbstractModule,
  asSingletonClass,
  type DependencyInjectionOptions,
  type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import type { CommonDependencies, ExternalDependencies } from '../../infrastructure/CommonModule.ts'
import { FakeIntegrationApiClient } from '../../integrations/fakeIntegration/client/FakeIntegrationApiClient.ts'
import { ADAPTER_LABEL } from '../adapter-common/types/AdapterTypes.js'
import { TemplateAuthService } from './auth/TemplateAuthService.js'
import { TemplateCacheService } from './cache/TemplateCacheService.ts'
import { TemplateEnvService } from './env/TemplateEnvService.ts'
import { TemplateItemListService } from './itemList/TemplateItemListService.ts'
import { TemplatePublishService } from './publish/TemplatePublishService.ts'
import { TemplateAdapter } from './TemplateAdapter.js'
import { TemplateTranslateService } from './translate/TemplateTranslateService.ts'

export type TemplateInjectableDependencies = TemplateDependencies & CommonDependencies
export type TemplatePublicDependencies = Pick<TemplateDependencies, 'templateAdapter'>

// Replace "Template" with the name of the integration
export class TemplateAdapterModule extends AbstractModule<
  TemplateDependencies,
  ExternalDependencies
> {
  resolveDependencies(
    _diOptions: DependencyInjectionOptions,
    _externalDependencies: ExternalDependencies,
  ) {
    return {
      fakeIntegrationApiClient: asSingletonClass(FakeIntegrationApiClient),
      templateCacheService: asSingletonClass(TemplateCacheService),
      templateAuthService: asSingletonClass(TemplateAuthService),
      templateEnvService: asSingletonClass(TemplateEnvService),
      templateTranslateService: asSingletonClass(TemplateTranslateService),
      templatePublishService: asSingletonClass(TemplatePublishService),
      templateItemListService: asSingletonClass(TemplateItemListService),
      templateAdapter: asSingletonClass(TemplateAdapter, {
        tags: [ADAPTER_LABEL],
      }),
    }
  }

  resolveControllers(): MandatoryNameAndRegistrationPair<unknown> {
    return {}
  }
}

export interface TemplateDependencies {
  fakeIntegrationApiClient: FakeIntegrationApiClient
  templateCacheService: TemplateCacheService
  templateAuthService: TemplateAuthService
  templateEnvService: TemplateEnvService
  templatePublishService: TemplatePublishService
  templateTranslateService: TemplateTranslateService
  templateItemListService: TemplateItemListService
  templateAdapter: TemplateAdapter
}
