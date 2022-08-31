import z from 'zod'

import { contentItem } from '../schema'

export const publishRequestBody = z.object({
  items: z.array(contentItem),
})

export const publishResponseBody = z.object({
  status: z.number(),
  message: z.string(),
})
