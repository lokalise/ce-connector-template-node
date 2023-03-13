import type z from 'zod'

import type { ApiReply } from '../commonTypes'

import type { publishRequestBody, publishResponseBody } from './publishSchemas'

export type PublishRequestBody = z.infer<typeof publishRequestBody>
type PublishResponseBody = z.infer<typeof publishResponseBody>
export type PublishResponse = ApiReply<PublishResponseBody>
