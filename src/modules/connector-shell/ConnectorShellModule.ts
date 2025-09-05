import {
  AbstractModule,
  asControllerClass,
  asSingletonFunction,
  type DependencyInjectionOptions,
  type MandatoryNameAndRegistrationPair,
} from 'opinionated-machine'
import type { CommonDependencies, ExternalDependencies } from '../../infrastructure/CommonModule.ts'
import type { TemplateAdapter } from '../adapter/TemplateAdapter.ts'
import type { TemplatePublicDependencies } from '../adapter/TemplateAdapterModule.ts'
import { ADAPTER_LABEL, type Adapter } from '../adapter-common/types/AdapterTypes.ts'
import { AuthController } from '../connector-shell/auth/authController.ts'
import { CacheController } from '../connector-shell/cache/cacheController.ts'
import { EnvController } from '../connector-shell/env/envController.ts'
import { ItemListController } from '../connector-shell/itemList/ItemListController.ts'
import { PublishController } from '../connector-shell/publish/publishController.ts'
import { TranslateController } from '../connector-shell/translate/translateController.ts'

export type ConnectorShellInjectableDependencies = ConnectorShellDependencies &
  TemplatePublicDependencies &
  CommonDependencies

export type SupportedConnectors = typeof TemplateAdapter.connectorName

export class ConnectorShellModule extends AbstractModule<
  ConnectorShellDependencies,
  ExternalDependencies
> {
  resolveDependencies(
    _diOptions: DependencyInjectionOptions,
    _externalDependencies: ExternalDependencies,
  ) {
    return {
      adapters: asSingletonFunction((dependencies: ConnectorShellInjectableDependencies) => {
        const adapterMap = dependencies.awilixManager.getWithTags([ADAPTER_LABEL])
        return Object.values(adapterMap).reduce(
          (acc, adapter: Adapter) => {
            acc[adapter.getConnectorName()] = adapter
            return acc
          },
          {} as Record<SupportedConnectors, Adapter>,
        )
      }),
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

export interface ConnectorShellDependencies {
  adapters: Record<SupportedConnectors, Adapter>
}
