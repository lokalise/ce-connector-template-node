import z from 'zod'

export const localeDefinition = z.object({
  defaultLocale: z.string(),
  locales: z.array(
    z.object({
      name: z.string(),
      code: z.string(),
    }),
  ),
})

export const envResponseBody = localeDefinition.extend({
  cacheItemStructure: z.record(z.string(), z.string()),
})
