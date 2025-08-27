import type { AbstractModule } from 'opinionated-machine'
import { CommonModule } from './infrastructure/CommonModule.ts'
import { ConnectorModule } from './modules/ConnectorModule.js'

export const ALL_MODULES: readonly AbstractModule<unknown>[] = [
  new CommonModule(),
  new ConnectorModule(),
]
