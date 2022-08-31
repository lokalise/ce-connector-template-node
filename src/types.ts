import type z from 'zod'

import type { itemIdentifiers, contentItem } from './routes/schema'

export type ItemIdentifiers = z.infer<typeof itemIdentifiers>
export type ContentItem = z.infer<typeof contentItem>
