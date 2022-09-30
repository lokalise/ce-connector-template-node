import z from 'zod'

import { integrationConfig } from '../schema'

const AUTH_TYPES_AVAILABLE = ['OAuth', 'apiKey'] as const

export const getAuthResponseBody = z.object({
  type: z.enum(AUTH_TYPES_AVAILABLE),
})

export const authRequestBody = integrationConfig

export const authRefreshRequestBody = z.object({}).passthrough()

export const authResponseBody = z.object({}).passthrough()
