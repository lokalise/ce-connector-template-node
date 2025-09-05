import type { AbstractModule } from 'opinionated-machine'
import { CommonModule } from './infrastructure/CommonModule.ts'
import { TemplateAdapterModule } from './modules/adapter/TemplateAdapterModule.ts'
import { ConnectorShellModule } from './modules/connector-shell/ConnectorShellModule.js'

export const ALL_MODULES: readonly AbstractModule<unknown>[] = [
  new CommonModule(),
  new TemplateAdapterModule(),
  new ConnectorShellModule(),
]
