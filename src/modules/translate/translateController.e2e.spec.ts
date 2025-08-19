import type { TranslateRequestBody } from '@lokalise/connector-api-contracts'
import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'
import { createTestRequestHeaders } from '../../../test/fixtures/testHeaders.ts'
import { getApp, getPrefix } from '../../app.ts'
import type { ExternalItem } from '../../integrations/fakeIntegration/client/fakeIntegrationApiTypes.ts'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`
const JSON_HEADERS = {
  'content-type': 'application/json',
}

const mockServer = getLocal()

describe('translateController e2e', () => {
  describe('POST /translate', () => {
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

    it('translates', async () => {
      // Replace with whatever mock you need
      await mockServer
        .forGet('/placeholder')
        .thenReply(
          200,
          JSON.stringify([{ id: '1', name: 'dummy' }] satisfies ExternalItem[]),
          JSON_HEADERS,
        )
      const response = await app.inject({
        method: 'POST',
        url: `${getPrefix()}/translate`,
        payload: {
          items: [],
          locales: [],
          defaultLocale: 'en',
        } satisfies TranslateRequestBody,
        headers: createTestRequestHeaders({}, {}),
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({
        items: [],
        updateItems: [],
      })
    })
  })
})
