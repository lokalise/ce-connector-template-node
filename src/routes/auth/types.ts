import type z from 'zod'

import type { ApiReply } from '../types'

import type { getAuthResponseBody, postAuthResponseRequestBody } from './schema'

export type GetAuthResponseBody = z.infer<typeof getAuthResponseBody>
export type GetAuthResponse = ApiReply<GetAuthResponseBody>

export type PostAuthResponseBody = Record<string, unknown>
// url field is needed if OAuth flow used
export type PostAuthResponse = ApiReply<PostAuthResponseBody> & { url?: string }

export type PostAuthRefreshResponse = ApiReply<PostAuthResponseBody>

export type PostAuthResponseRequestPayload = z.infer<typeof postAuthResponseRequestBody>
export type PostAuthResponseResponseBody = Record<string, unknown>
export type PostAuthResponseResponse = ApiReply<PostAuthResponseResponseBody>
