import type z from 'zod/v4'

import type { ApiReply } from '../commonTypes.ts'

import type { cacheRequestBody, cacheResponseBody, listCacheResponseBody } from './cacheSchemas.ts'

type ListCacheResponseBody = z.infer<typeof listCacheResponseBody>
export type ListCacheResponse = ApiReply<ListCacheResponseBody>

export type CacheRequestBody = z.infer<typeof cacheRequestBody>
export type CacheResponseBody = z.infer<typeof cacheResponseBody>
export type CacheResponse = ApiReply<CacheResponseBody>
