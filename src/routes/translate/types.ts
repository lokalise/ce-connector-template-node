import type z from 'zod'

import type { ApiReply } from '../types'

import type { translateRequestBody, translateResponseBody } from './schema'

export type TranslateRequestBody = z.infer<typeof translateRequestBody>
export type TranslateResponseBody = z.infer<typeof translateResponseBody>
export type TranslateResponse = ApiReply<TranslateResponseBody>
