import type z from 'zod'

import type { ApiReply } from '../types'

import type { publishRequestBody, publishResponseBody } from './schema'

export type PublishRequestBody = z.infer<typeof publishRequestBody>
type PublishResponseBody = z.infer<typeof publishResponseBody>
export type PublishResponse = ApiReply<PublishResponseBody>
