import type { CacheResponseBody, ListCacheResponseBody } from '@lokalise/connector-api-contracts'
import type { ApiReply } from '../commonTypes.ts'

export type ListCacheResponse = ApiReply<ListCacheResponseBody>

export type CacheResponse = ApiReply<CacheResponseBody>
