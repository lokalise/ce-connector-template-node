import type { FastifyReply } from 'fastify'
import type z from 'zod'

import type { apiError } from './schema'

export type ApiError = z.infer<typeof apiError>

export interface ApiReply<P extends Record<string, unknown>> extends FastifyReply {
  send(payload: P | ApiError): FastifyReply
  status(statusCode: 200 | ApiError['statusCode']): FastifyReply
}
