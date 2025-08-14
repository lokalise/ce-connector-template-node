import type z from 'zod/v4'

import type { ApiReply } from '../commonTypes.ts'

import type { translateRequestBody, translateResponseBody } from './translateSchemas.ts'

export type TranslateRequestBody = z.infer<typeof translateRequestBody>
export type TranslateResponseBody = z.infer<typeof translateResponseBody>
export type TranslateResponse = ApiReply<TranslateResponseBody>
