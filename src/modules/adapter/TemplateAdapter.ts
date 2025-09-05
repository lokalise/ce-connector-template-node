// Replace "Template" with the name of the integration

import type { Adapter } from '../adapter-common/types/AdapterTypes.js'
import type { TemplateAuthService } from './auth/TemplateAuthService.js'
import type { TemplateCacheService } from './cache/TemplateCacheService.js'
import type { TemplateEnvService } from './env/TemplateEnvService.js'
import type { TemplateItemListService } from './itemList/TemplateItemListService.js'
import type { TemplatePublishService } from './publish/TemplatePublishService.js'
import type { TemplateInjectableDependencies } from './TemplateAdapterModule.js'
import type { TemplateTranslateService } from './translate/TemplateTranslateService.js'

// Replace with the real integration config for the integration
export type IntegrationConfig = Record<string, unknown>

// Replace with the real auth config for the integration
export type AuthConfig = Record<string, unknown>

export class TemplateAdapter implements Adapter {
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
