import { describeContract } from '@lokalise/api-contracts'
import { JSON_HEADERS } from '@lokalise/backend-http-client'
import { postTranslateContract } from '@lokalise/connector-api-contracts'
import { injectPost } from '@lokalise/fastify-api-contracts'
import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'
import { createTestRequestHeaders } from '../../../../test/fixtures/testHeaders.ts'
import { getApp } from '../../../app.ts'
import type { ExternalItem } from '../../adapter/apiClients/TemplateApiTypes.js'
import { TranslateController } from './translateController.ts'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`

const mockServer = getLocal()

describe('translateController e2e', () => {
  describe(describeContract(TranslateController.contracts.postTranslate), () => {
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

    it('translates', async () => {
      // Replace with whatever mock you need
      await mockServer
        .forGet('/placeholder')
        .thenReply(
          200,
          JSON.stringify([{ id: '1', name: 'dummy' }] satisfies ExternalItem[]),
          JSON_HEADERS,
        )
      const response = await injectPost(app, postTranslateContract, {
        body: {
          items: [],
          locales: [],
          defaultLocale: 'en',
        },
        headers: createTestRequestHeaders({}, {}),
      })

      expect(response.statusCode).toBe(200)
      expect(response.json()).toMatchInlineSnapshot(`
        {
          "items": [],
        }
      `)
    })
  })
})
