import type z from 'zod'

import type { ApiReply } from '../commonTypes.js'

import type { translateRequestBody, translateResponseBody } from './translateSchemas.js'

export type TranslateRequestBody = z.infer<typeof translateRequestBody>
export type TranslateResponseBody = z.infer<typeof translateResponseBody>
export type TranslateResponse = ApiReply<TranslateResponseBody>
