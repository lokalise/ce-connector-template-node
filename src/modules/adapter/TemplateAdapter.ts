// Replace "Template" with the name of the integration

import type { Adapter } from '../adapter-common/types/AdapterTypes.ts'
import type { TemplateAuthService } from './auth/TemplateAuthService.ts'
import type { TemplateCacheService } from './cache/TemplateCacheService.ts'
import type { TemplateEnvService } from './env/TemplateEnvService.ts'
import type { TemplateItemListService } from './itemList/TemplateItemListService.ts'
import type { TemplatePublishService } from './publish/TemplatePublishService.ts'
import type { TemplateInjectableDependencies } from './TemplateAdapterModule.ts'
import type { TemplateTranslateService } from './translate/TemplateTranslateService.ts'

// Replace with the real integration config for the integration
export type IntegrationConfig = Record<string, unknown>

// Replace with the real auth config for the integration
export type AuthConfig = Record<string, unknown>

export class TemplateAdapter implements Adapter {
  // replace this with an identifier unique to the integration
  static connectorName = 'template' as const

  public readonly authServiceAPIKey: TemplateAuthService
  public readonly authServiceOAuth: TemplateAuthService
  public readonly cacheService: TemplateCacheService
  public readonly envService: TemplateEnvService
  public readonly itemListService: TemplateItemListService
  public readonly publishService: TemplatePublishService
  public readonly translateService: TemplateTranslateService

  constructor(dependencies: TemplateInjectableDependencies) {
    this.authServiceAPIKey = dependencies.templateAuthService
    this.authServiceOAuth = dependencies.templateAuthService
    this.cacheService = dependencies.templateCacheService
    this.envService = dependencies.templateEnvService
    this.itemListService = dependencies.templateItemListService
    this.publishService = dependencies.templatePublishService
    this.translateService = dependencies.templateTranslateService
  }

  getConnectorName() {
    return TemplateAdapter.connectorName
  }
}
