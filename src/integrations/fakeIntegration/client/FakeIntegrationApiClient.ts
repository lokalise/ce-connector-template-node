// TODO: fakeIntegration connector 3-rd party client implementation

import { buildClient, sendGet } from '@lokalise/node-core'
import type { Client } from 'undici'

import { Config } from '../../../infrastructure/config'
import type { Dependencies } from '../../../infrastructure/diConfig'

import type { ExternalItem } from './fakeIntegrationApiTypes'

const RETRY_CONFIG = {
  retryOnTimeout: false,
  statusCodesToRetry: [500, 502, 503],
  maxAttempts: 5,
  delayBetweenAttemptsInMsecs: 250,
}

export class FakeIntegrationApiClient {
  private readonly client: Client
  constructor({ config }: Dependencies) {
    this.client = buildClient(config.integrations.fakeStore.baseUrl, {
      bodyTimeout: 5000,
      headersTimeout: 5000,
    })
  }

  async listItems() {
    const response = await sendGet<ExternalItem[]>(this.client, `/items`, {
      retryConfig: RETRY_CONFIG,
    })

    return response.result.body
  }
}
