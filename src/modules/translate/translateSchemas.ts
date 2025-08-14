import z from 'zod/v4'

import { contentItem, itemIdentifiers } from '../commonSchemas.ts'

export const translateRequestBody = z.object({
  locales: z.array(z.string()),
  items: z.array(itemIdentifiers),
  defaultLocale: z.string(),
})

export const translateResponseBody = z.object({
  items: z.array(contentItem),
  updateItems: z.array(itemIdentifiers),
})

export type TranslateRequestBodyType = z.infer<typeof translateRequestBody>
