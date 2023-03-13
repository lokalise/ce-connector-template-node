import type z from 'zod'

import type { ApiReply } from '../commonTypes'

import type { translateRequestBody, translateResponseBody } from './translateSchemas'

export type TranslateRequestBody = z.infer<typeof translateRequestBody>
export type TranslateResponseBody = z.infer<typeof translateResponseBody>
export type TranslateResponse = ApiReply<TranslateResponseBody>
