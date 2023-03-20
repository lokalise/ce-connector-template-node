import type { AuthConfig, IntegrationConfig } from 'src/types'

export class EnvService {
  async getLocales(config: IntegrationConfig, auth: AuthConfig) {
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

  async getCacheItemStructure(config: IntegrationConfig, auth: AuthConfig) {
    //TODO: implementation
    return Promise.resolve({ foo: 'bar' })
  }
}
