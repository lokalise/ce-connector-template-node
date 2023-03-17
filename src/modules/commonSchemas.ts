import z from 'zod'

export const itemIdentifiers = z.object({
  uniqueId: z.string(),
  groupId: z.string(),
  metadata: z.record(z.any(), z.any()),
})

export type ItemIdentifiers = z.infer<typeof itemIdentifiers>

export const contentItem = itemIdentifiers.extend({
  translations: z.record(z.string(), z.string()),
})

export const apiError = z.object({
  message: z.string(),
  statusCode: z.number(),
})

export const authError = z.object({
  message: z.string(),
  errorCode: z.number(),
  details: z.object({}).passthrough(),
})

export const integrationConfig = z.object({}).passthrough()

export const authConfig = z.object({}).passthrough()
