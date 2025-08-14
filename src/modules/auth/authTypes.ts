import type z from 'zod/v4'

import type { ApiReply } from '../commonTypes.ts'

import type { getAuthResponseBody, postAuthResultRequestBody } from './authSchemas.ts'

export type GetAuthResponseBody = z.infer<typeof getAuthResponseBody>
export type GetAuthResponse = ApiReply<GetAuthResponseBody>

// url field is needed if OAuth flow used
export type PostAuthResponseBody = Record<string, unknown> & { url?: string }
export type PostAuthResponse = ApiReply<PostAuthResponseBody>

export type PostAuthRefreshResponse = ApiReply<PostAuthResponseBody>

export type PostAuthResultRequestPayload = z.infer<typeof postAuthResultRequestBody>
export type PostAuthResultResponseBody = Record<string, unknown>
export type PostAuthResultResponse = ApiReply<PostAuthResultResponseBody>
