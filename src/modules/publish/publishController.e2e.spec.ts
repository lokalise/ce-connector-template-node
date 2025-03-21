import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'

import { createTestRequestHeaders } from '../../../test/fixtures/testHeaders.js'
import { getApp, getPrefix } from '../../app.js'
import type { ExternalItem } from '../../integrations/fakeIntegration/client/fakeIntegrationApiTypes.js'

import type { PublishRequestBodyType } from './publishSchemas.js'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`
const JSON_HEADERS = {
  'content-type': 'application/json',
}

const mockServer = getLocal()

describe('publishController e2e', () => {
  describe('POST /publish', () => {
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

    it('publishes', async () => {
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
        url: `${getPrefix()}/publish`,
        payload: {
          items: [],
          defaultLocale: 'en',
        } satisfies PublishRequestBodyType,
        headers: createTestRequestHeaders({}, {}),
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toEqual({
        message: 'Content successfully updated',
        status: 200,
        updateItems: [],
      })
    })
  })
})
