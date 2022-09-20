import type z from 'zod'

import type { ApiReply } from '../types'

import type { getAuthResponseBody, postAuthResultRequestBody } from './schema'

export type GetAuthResponseBody = z.infer<typeof getAuthResponseBody>
export type GetAuthResponse = ApiReply<GetAuthResponseBody>

// url field is needed if OAuth flow used
export type PostAuthResponseBody = Record<string, unknown> & { url?: string }
export type PostAuthResponse = ApiReply<PostAuthResponseBody>

export type PostAuthRefreshResponse = ApiReply<PostAuthResponseBody>

export type PostAuthResponseRequestPayload = z.infer<typeof postAuthResultRequestBody>
export type PostAuthResponseResponseBody = Record<string, unknown>
export type PostAuthResponseResponse = ApiReply<PostAuthResponseResponseBody>
