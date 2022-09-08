import z from 'zod'

const AUTH_TYPES_AVAILABLE = ['OAuth', 'apiToken'] as const

export const getAuthResponseBody = z.object({
  type: z.enum(AUTH_TYPES_AVAILABLE),
})

export const authRequestBody = z.object({
  key: z.string(),
})

export const authRefreshRequestBody = z.object({
  refreshKey: z.string(),
})

export const authResponseBody = z.object({
  key: z.string(),
})
