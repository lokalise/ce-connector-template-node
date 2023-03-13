import type z from 'zod'

import type { ApiReply } from '../commonTypes'

import type { cacheResponseBody, cacheRequestBody, listCacheResponseBody } from './cacheSchemas'

type ListCacheResponseBody = z.infer<typeof listCacheResponseBody>
export type ListCacheResponse = ApiReply<ListCacheResponseBody>

export type CacheRequestBody = z.infer<typeof cacheRequestBody>
export type CacheResponseBody = z.infer<typeof cacheResponseBody>
export type CacheResponse = ApiReply<CacheResponseBody>
