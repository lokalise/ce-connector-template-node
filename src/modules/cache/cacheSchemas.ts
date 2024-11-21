import z from 'zod'

import { itemIdentifiers } from '../commonSchemas.js'

export const cacheItem = itemIdentifiers.extend({
  fields: z.object({}).passthrough(),
  title: z.string().max(255),
  groupTitle: z.string().max(255),
})

export const listCacheResponseBody = z.object({
  items: z.array(itemIdentifiers),
})

export const cacheResponseBody = z.object({
  items: z.array(cacheItem),
})

export const cacheRequestBody = z.object({
  items: z.array(itemIdentifiers),
})
