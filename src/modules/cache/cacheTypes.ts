import type z from 'zod'

import type { ApiReply } from '../commonTypes.js'

import type { cacheRequestBody, cacheResponseBody, listCacheResponseBody } from './cacheSchemas.js'

type ListCacheResponseBody = z.infer<typeof listCacheResponseBody>
export type ListCacheResponse = ApiReply<ListCacheResponseBody>

export type CacheRequestBody = z.infer<typeof cacheRequestBody>
export type CacheResponseBody = z.infer<typeof cacheResponseBody>
export type CacheResponse = ApiReply<CacheResponseBody>
