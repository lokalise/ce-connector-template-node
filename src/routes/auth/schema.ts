import z from 'zod'

export const authRequestBody = z.object({
  key: z.string(),
})

export const authRefreshRequestBody = z.object({
  refreshKey: z.string(),
})

export const authResponseBody = z.object({
  key: z.string(),
})
