import type z from 'zod/v4'

import type { ApiReply } from '../commonTypes.ts'

import type { publishRequestBody, publishResponseBody } from './publishSchemas.ts'

export type PublishRequestBody = z.infer<typeof publishRequestBody>
type PublishResponseBody = z.infer<typeof publishResponseBody>
export type PublishResponse = ApiReply<PublishResponseBody>
