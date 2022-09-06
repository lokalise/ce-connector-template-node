import z from 'zod'

import { contentItem, itemIdentifiers } from '../schema'

export const translateRequestBody = z.object({
  locales: z.array(z.string()),
  items: z.array(itemIdentifiers),
})

export const translateResponseBody = z.object({
  items: z.array(contentItem),
})
