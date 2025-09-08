import { describeContract } from '@lokalise/api-contracts'
import { JSON_HEADERS } from '@lokalise/backend-http-client'
import { getEnvContract } from '@lokalise/connector-api-contracts'
import { injectGet } from '@lokalise/fastify-api-contracts'
import type { FastifyInstance } from 'fastify'
import { getLocal } from 'mockttp'
import { createTestRequestHeaders } from '../../../../test/fixtures/testHeaders.ts'
import { getApp } from '../../../app.ts'
import type { ExternalItem } from '../../adapter/apiClients/TemplateApiTypes.js'
import { EnvController } from './envController.ts'

const mockPort = 8000
const mockBaseUrl = `http://localhost:${mockPort}`

const mockServer = getLocal()

describe('envController e2e', () => {
  describe(describeContract(EnvController.contracts.getEnv), () => {
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

    it('resolves env', async () => {
      // Replace with whatever mock you need
      await mockServer
        .forGet('/placeholder')
        .thenReply(
          200,
          JSON.stringify([{ id: '1', name: 'dummy' }] satisfies ExternalItem[]),
          JSON_HEADERS,
        )
      const response = await injectGet(app, getEnvContract, {
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
