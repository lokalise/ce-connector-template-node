import { describeContract } from '@lokalise/api-contracts'
import { JSON_HEADERS } from '@lokalise/backend-http-client'
import { postPublishContract } from '@lokalise/connector-api-contracts'
import { injectPost } from '@lokalise/fastify-api-contracts'
import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'
import { createTestRequestHeaders } from '../../../../test/fixtures/testHeaders.ts'
import { getApp } from '../../../app.ts'
import type { ExternalItem } from '../../../integrations/fakeIntegration/client/fakeIntegrationApiTypes.ts'
import { PublishController } from './publishController.ts'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`

const mockServer = getLocal()

describe('publishController e2e', () => {
  describe(describeContract(PublishController.contracts.postPublishContract), () => {
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

    it('publishes', async () => {
      // Replace with whatever mock you need
      await mockServer
        .forGet('/placeholder')
        .thenReply(
          200,
          JSON.stringify([{ id: '1', name: 'dummy' }] satisfies ExternalItem[]),
          JSON_HEADERS,
        )
      const response = await injectPost(app, postPublishContract, {
        body: {
          items: [],
          defaultLocale: 'en',
        },
        headers: createTestRequestHeaders({}, {}),
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchInlineSnapshot(`
        {
          "message": "Content successfully updated",
          "statusCode": 200,
        }
      `)
    })
  })
})
