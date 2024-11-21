import z from 'zod'

import { contentItem, itemIdentifiers } from '../commonSchemas.js'

export const publishRequestBody = z.object({
  items: z.array(contentItem),
  defaultLocale: z.string(),
})

export const publishResponseBody = z.object({
  status: z.number(),
  message: z.string(),
  updateItems: z.array(itemIdentifiers),
})

export type PublishRequestBodyType = z.infer<typeof publishRequestBody>
