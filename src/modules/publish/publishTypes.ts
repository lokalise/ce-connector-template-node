import type z from 'zod'

import type { ApiReply } from '../commonTypes.js'

import type { publishRequestBody, publishResponseBody } from './publishSchemas.js'

export type PublishRequestBody = z.infer<typeof publishRequestBody>
type PublishResponseBody = z.infer<typeof publishResponseBody>
export type PublishResponse = ApiReply<PublishResponseBody>
