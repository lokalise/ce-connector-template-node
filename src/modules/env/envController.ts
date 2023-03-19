import type { FastifyRequest } from 'fastify'

import type { EnvResponse } from './envTypes'

export const getEnv = async (req: FastifyRequest, reply: EnvResponse) => {
  const { envService } = req.diScope.cradle

  const localeData = await envService.getLocales(req.integrationConfig, req.authConfig)
  if (!localeData) {
    await reply.status(403).send({
      message: 'Could not retrieve locales from 3rd party.',
      statusCode: 403,
    })
    return
  }

  const cacheItemStructure = await envService.getCacheItemStructure(
    req.integrationConfig,
    req.authConfig,
  )

  await reply.send({
    ...localeData,
    cacheItemStructure,
  })
}
