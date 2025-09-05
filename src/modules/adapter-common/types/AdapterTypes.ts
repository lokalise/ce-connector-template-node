import type {
  CacheItem,
  ContentItem,
  EnvLocaleDefinition,
  ItemIdentifier,
  PostAuthResponseRequestBody,
} from '@lokalise/connector-api-contracts'
import type { Either } from '@lokalise/node-core'
import type { ItemListResult } from '../../adapter/itemList/TemplateItemListService.js'

export const ADAPTER_LABEL = 'connectorAdapter'

export type Adapter = {
  getConnectorName: () => string
  authServiceAPIKey?: AuthServiceAPIKey<unknown, unknown, Record<string, unknown>>
  authServiceOAuth?: AuthServiceOAuth<unknown, Record<string, unknown>>
  cacheService: CacheService<unknown, unknown>
  envService: EnvService<unknown, unknown>
  itemListService: ItemListService<unknown, unknown>
  publishService: PublishService<unknown, unknown>
  translateService: TranslateService<unknown, unknown>
}

export type AuthServiceAPIKey<
  IntegrationConfig,
  AuthConfig,
  AuthResult extends Record<string, unknown>,
> = {
  supportsApiToken: true

  validate(config: IntegrationConfig): Promise<AuthResult>
  refresh(config: IntegrationConfig, auth: AuthConfig): Promise<AuthResult>
}

export type AuthServiceOAuth<IntegrationConfig, AuthCredentials extends Record<string, unknown>> = {
  supportsOAuth: true

  getAuthCredentials(authData: PostAuthResponseRequestBody): Promise<AuthCredentials>
  generateAuthorizationUrl(config: IntegrationConfig): Promise<string>
}

export type CacheService<IntegrationConfig, AuthConfig> = {
  listItems(config: IntegrationConfig, auth: AuthConfig): Promise<ItemIdentifier[]>
  getItems(config: IntegrationConfig, auth: AuthConfig, ids: ItemIdentifier[]): Promise<CacheItem[]>
}

export type EnvService<IntegrationConfig, AuthConfig> = {
  getLocales(config: IntegrationConfig, auth: AuthConfig): Promise<EnvLocaleDefinition>
  getCacheItemStructure(
    config: IntegrationConfig,
    auth: AuthConfig,
  ): Promise<Record<string, string>>
}

export type ItemListService<IntegrationConfig, AuthConfig> = {
  getItemList(config: IntegrationConfig, auth: AuthConfig): Promise<ItemListResult>
}

export type PublishService<IntegrationConfig, AuthConfig> = {
  publishContent(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _items: ContentItem[],
    // Default locale might not be needed for integration logic
    _defaultLocale: string,
  ): Promise<Either<ItemIdentifier[], true>>
}

export type TranslateService<IntegrationConfig, AuthConfig> = {
  getContent(
    _config: IntegrationConfig,
    _auth: AuthConfig,
    _locales: string[],
    _ids: ItemIdentifier[],
    _defaultLocale: string,
  ): Promise<ContentItem[]>
}
