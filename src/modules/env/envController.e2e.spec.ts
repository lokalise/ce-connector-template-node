import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'

import { createTestRequestHeaders } from '../../../test/fixtures/testHeaders.ts'
import { getApp } from '../../app.ts'
import type { ExternalItem } from '../../integrations/fakeIntegration/client/fakeIntegrationApiTypes.ts'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`
const JSON_HEADERS = {
  'content-type': 'application/json',
}

const mockServer = getLocal()

describe('envController e2e', () => {
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

    it('resolves env', async () => {
      // Replace with whatever mock you need
      await mockServer
        .forGet('/placeholder')
        .thenReply(
          200,
          JSON.stringify([{ id: '1', name: 'dummy' }] satisfies ExternalItem[]),
          JSON_HEADERS,
        )
      const response = await app.inject({
        method: 'GET',
        url: '/env',
        headers: createTestRequestHeaders({}, {}),
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({
        cacheItemStructure: {
          foo: 'bar',
        },
        defaultLocale: 'en',
        locales: [
          {
            code: 'en',
            name: 'English',
          },
        ],
      })
    })
  })
})
