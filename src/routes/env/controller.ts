import type { FastifyRequest } from 'fastify'

import envService from '../../services/envService'

import type { EnvResponse } from './types'

const getEnv = async (req: FastifyRequest, reply: EnvResponse) => {
  const localeData = await envService.getLocales(req.accessToken)
  if (!localeData) {
    reply.status(403).send({
      message: 'Could not retrieve locales from 3rd party.',
      statusCode: 403,
    })
    return
  }

  const cacheItemStructure = await envService.getCacheItemStructure()

  reply.send({
    ...localeData,
    cacheItemStructure,
  })
}

const envController = {
  getEnv,
}

export default envController
