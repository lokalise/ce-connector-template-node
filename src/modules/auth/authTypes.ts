import type {
  GetAuthResponseBody,
  PostAuthResponseBody,
  PostAuthResultResponseBody,
} from '@lokalise/connector-api-contracts'
import type { ApiReply } from '../commonTypes.ts'

export type GetAuthResponse = ApiReply<GetAuthResponseBody>

// url field is needed if OAuth flow used
export type PostAuthResponse = ApiReply<PostAuthResponseBody>

export type PostAuthRefreshResponse = ApiReply<PostAuthResponseBody>

export type PostAuthResultResponse = ApiReply<PostAuthResultResponseBody>
