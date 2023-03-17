import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'

import { createTestRequestHeaders } from '../../../test/fixtures/testHeaders'
import { getApp, getPrefix } from '../../app'
import type { ExternalItem } from '../../integrations/fakeIntegration/client/fakeIntegrationApiTypes'

const mockBaseUrl = 'http://localhost:8080'
const JSON_HEADERS = {
  'content-type': 'application/json',
}

const mockServer = getLocal()

describe('cacheController e2e', () => {
  describe('GET /cache', () => {
    let app: FastifyInstance
    beforeAll(async () => {
      app = await getApp()
      await mockServer.start(8080)
      const { config } = app.diContainer.cradle
      config.integrations.fakeStore.baseUrl = mockBaseUrl
    })

    afterAll(async () => {
      await app.close()
      await mockServer.stop()
    })

    it('resolves cache items', async () => {
      await mockServer
        .forGet('/items')
        .thenReply(
          200,
          JSON.stringify([{ id: '1', name: 'dummy' }] satisfies ExternalItem[]),
          JSON_HEADERS,
        )
      const response = await app.inject({
        method: 'GET',
        url: `${getPrefix()}/cache`,
        headers: createTestRequestHeaders({}, {}),
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({
        items: [
          {
            groupId: 'dummy',
            metadata: {},
            uniqueId: '1',
          },
        ],
      })
    })
  })
})
