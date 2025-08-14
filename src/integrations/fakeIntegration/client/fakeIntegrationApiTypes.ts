// TODO: fakeIntegration connector 3-rd party client types

import z from 'zod/v4'

export type ExternalItemResponse = z.infer<typeof EXTERNAL_ITEM_RESPONSE_SCHEMA>
export type ExternalItem = z.infer<typeof EXTERNAL_ITEM_SCHEMA>

export const EXTERNAL_ITEM_SCHEMA = z.object({
  id: z.string(),
  name: z.string(),
})

export const EXTERNAL_ITEM_RESPONSE_SCHEMA = z.array(EXTERNAL_ITEM_SCHEMA)
