import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'
import type { RouteHandlerMethod } from 'fastify/types/route'

import { InternalError } from './InternalError'
import { errorHandler } from './errorHandler'
import { AuthFailedError } from './publicErrors'

async function initApp(routeHandler: RouteHandlerMethod, awaitApp = true) {
  const app = fastify()
  app.setErrorHandler(errorHandler)

  app.route({
    method: 'GET',
    url: '/',
    handler: routeHandler,
  })
  if (awaitApp) {
    await app.ready()
  }
  return app
}

describe('errorHandler', () => {
  let app: FastifyInstance
  afterAll(async () => {
    await app.close()
  })

  it('returns 500 internal error by default', async () => {
    app = await initApp(() => {
      throw new Error('Generic error')
    })

    const response = await app.inject().get('/').end()

    expect(response.statusCode).toBe(500)
    expect(response.body).toBe('Internal Server Error')
  })

  it('returns correct response for PublicNonRecoverableError', async () => {
    app = await initApp(() => {
      throw new AuthFailedError({ message: 'Auth failed', details: { userId: 4 } })
    })

    const response = await app.inject().get('/').end()

    expect(response.statusCode).toBe(401)
    expect(response.json()).toEqual({
      message: 'Auth failed',
      errorCode: 'AUTH_FAILED',
      details: { userId: 4 },
    })
  })

  it('returns correct response for InternalError', async () => {
    app = await initApp(() => {
      throw new InternalError({
        message: 'Auth failed',
        details: { userId: 4 },
        errorCode: 'INT_ERR',
      })
    })

    const response = await app.inject().get('/').end()

    expect(response.statusCode).toBe(500)
    expect(response.body).toBe('Internal Server Error')
  })
})
