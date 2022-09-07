import z from 'zod'

import { contentItem } from '../schema'

export const publishRequestBody = z.object({
  items: z.array(contentItem),
  defaultLocale: z.string(),
})

export const publishResponseBody = z.object({
  status: z.number(),
  message: z.string(),
})
