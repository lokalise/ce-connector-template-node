import type http from 'http'

import type { FastifyReply, RouteOptions } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type z from 'zod'

import type { apiError } from './schema'

export type ApiError = z.infer<typeof apiError>

export interface ApiReply<P extends Record<string, unknown>> extends FastifyReply {
  send(payload: P | ApiError): FastifyReply
  status(statusCode: 200 | ApiError['statusCode']): FastifyReply
}

export type Routes = Array<
  RouteOptions<
    http.Server,
    http.IncomingMessage,
    http.ServerResponse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    ZodTypeProvider
  >
>
