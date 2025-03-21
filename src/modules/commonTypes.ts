import type http from 'node:http'

import type { FastifyReply, RouteOptions } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type z from 'zod'

import type { apiError } from './commonSchemas.js'

export type ApiError = z.infer<typeof apiError>

export interface ApiReply<P extends Record<string, unknown>> extends FastifyReply {
  send(payload: P | ApiError): FastifyReply
  status(statusCode: ApiError['statusCode']): FastifyReply
}

export type Routes = Array<
  RouteOptions<
    http.Server,
    http.IncomingMessage,
    http.ServerResponse,
    // biome-ignore lint/suspicious/noExplicitAny: this is intentionally loose
    any,
    // biome-ignore lint/suspicious/noExplicitAny: this is intentionally loose
    any,
    // biome-ignore lint/suspicious/noExplicitAny: this is intentionally loose
    any,
    ZodTypeProvider
  >
>
