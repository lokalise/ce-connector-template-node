import type z from 'zod'

import type { ApiReply } from '../types'

import type { authRequestBody, authRefreshRequestBody } from './schema'

export type PostAuthRequestPayload = z.infer<typeof authRequestBody>
export type PostAuthRefreshRequestPayload = z.infer<typeof authRefreshRequestBody>

export type AuthResponseBody = z.infer<typeof authRequestBody>
export type AuthResponse = ApiReply<AuthResponseBody>

export type AuthRefreshResponse = ApiReply<AuthResponseBody>
