import type z from 'zod'

import type { contentItem, itemIdentifiers } from './modules/commonSchemas.js'

export type ItemIdentifiers = z.infer<typeof itemIdentifiers>
export type ContentItem = z.infer<typeof contentItem>

export const isObject = (unknown: unknown): unknown is Record<PropertyKey, unknown> =>
  typeof unknown === 'object' && unknown !== null

export type IntegrationConfig = Record<string, unknown>
export type AuthConfig = Record<string, unknown>
