import { describeContract } from '@lokalise/api-contracts'
import { JSON_HEADERS } from '@lokalise/backend-http-client'
import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'
import { createTestRequestHeaders } from '../../../../test/fixtures/testHeaders.ts'
import { getApp } from '../../../app.ts'
import type { ExternalItem } from '../../adapter/apiClients/TemplateApiTypes.js'
import { CacheController } from './cacheController.ts'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`

const mockServer = getLocal()

describe('cacheController e2e', () => {
  describe(describeContract(CacheController.contracts.getCache), () => {
    let app: FastifyInstance
    beforeAll(async () => {
      app = await getApp({
        integrations: {
          fakeStore: {
            baseUrl: mockBaseUrl,
          },
        },
      })
      await mockServer.start(mockPort)
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
        url: 'cache',
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
