import { JSON_HEADERS } from '@lokalise/backend-http-client'
import { getAuthContract } from '@lokalise/connector-api-contracts'
import { injectGet } from '@lokalise/fastify-api-contracts'
import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'
import { createTestRequestHeaders } from '../../../test/fixtures/testHeaders.ts'
import { getApp } from '../../app.ts'
import type { ExternalItem } from '../../integrations/fakeIntegration/client/fakeIntegrationApiTypes.ts'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`

const mockServer = getLocal()

describe('authController e2e', () => {
  describe('GET /auth', () => {
    let app: FastifyInstance
    beforeAll(async () => {
      app = await getApp()
      await mockServer.start(mockPort)
      const { config } = app.diContainer.cradle
      config.integrations.fakeStore.baseUrl = mockBaseUrl
    })

    afterAll(async () => {
      await app.close()
      await mockServer.stop()
    })

    it('resolves auth', async () => {
      // Replace with whatever mock you need
      await mockServer
        .forGet('/placeholder')
        .thenReply(
          200,
          JSON.stringify([{ id: '1', name: 'dummy' }] satisfies ExternalItem[]),
          JSON_HEADERS,
        )
      const response = await injectGet(app, getAuthContract, {
        headers: createTestRequestHeaders({}, {}),
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({
        type: 'apiToken',
      })
    })
  })
})
