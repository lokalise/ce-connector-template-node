import z from 'zod'

import { authConfig, integrationConfig } from '../schema'

const AUTH_TYPES_AVAILABLE = ['OAuth', 'apiToken'] as const

export const getAuthResponseBody = z.object({
  type: z.enum(AUTH_TYPES_AVAILABLE),
})

export const authRequestBody = integrationConfig

export const authRefreshRequestBody = z.object({}).passthrough()

export const authResponseBody = authConfig

export const authResponseRequestBody = z.object({
  query: z.object({}).passthrough(),
  body: z.object({}).passthrough(),
  redirectUrl: z.string().max(255),
})

export const authResponseResponseBody = z.object({
  accessToken: z.string().max(255),
  expiresIn: z.number(),
  refreshToken: z.string().max(255),
})
