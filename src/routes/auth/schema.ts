import z from 'zod'

const AUTH_TYPES_AVAILABLE = ['OAuth', 'apiToken'] as const

export const getAuthResponseBody = z.object({
  type: z.enum(AUTH_TYPES_AVAILABLE),
})

export const postAuthResponseBody = z.object({}).passthrough()

export const postAuthResultRequestBody = z.object({
  query: z.object({}).passthrough(),
  body: z.object({}).passthrough(),
  redirectUrl: z.string().max(255),
})

export const postAuthResultResponseBody = z.object({}).passthrough()
