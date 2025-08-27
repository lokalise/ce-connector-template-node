import type { AbstractModule } from 'opinionated-machine'
import { CommonModule } from './infrastructure/CommonModule.ts'

export const ALL_MODULES: readonly AbstractModule<unknown>[] = [new CommonModule()]
