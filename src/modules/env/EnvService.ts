import type { AuthConfig, IntegrationConfig } from 'src/types'

export class EnvService {
  async getLocales(_config: IntegrationConfig, _auth: AuthConfig) {
    //TODO: implementation
    return Promise.resolve({
      defaultLocale: 'en',
      locales: [
        {
          code: 'en',
          name: 'English',
        },
      ],
    })
  }

  async getCacheItemStructure(_config: IntegrationConfig, _auth: AuthConfig) {
    //TODO: implementation
    return Promise.resolve({ foo: 'bar' })
  }
}
