import { buildClient, sendGet, TEST_OPTIONS } from '@lokalise/backend-http-client'
import type { FastifyInstance } from 'fastify'

import { getApp } from './app.ts'

describe('app', () => {
  let app: FastifyInstance
  beforeAll(async () => {
    app = await getApp({
      enableMetrics: true,
    })
  })

  afterAll(async () => {
    await app.close()
  })

  describe('healthcheck', () => {
    it('Returns public health check information', async () => {
      const response = await app.inject().get('/').end()

      expect(response.json()).toMatchObject({
        gitCommitSha: 'sha',
        heartbeat: 'HEALTHY',
        version: '1',
      })
      expect(response.statusCode).toBe(200)
    })

    it('Returns private health check information', async () => {
      const response = await app.inject().get('/health').end()

      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({
        checks: {
          dummy: 'HEALTHY',
        },
        heartbeat: 'HEALTHY',
        gitCommitSha: 'sha',
        version: '1',
      })
    })
  })

  describe('metrics', () => {
    it('Returns Prometheus metrics', async () => {
      const response = await sendGet(buildClient('http://127.0.0.1:9080'), '/metrics', TEST_OPTIONS)

      expect(response.result.statusCode).toBe(200)
    })
  })
})
