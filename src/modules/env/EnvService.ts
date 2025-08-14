import type { AuthConfig, IntegrationConfig } from '../../types.ts'

export class EnvService {
  getLocales(_config: IntegrationConfig, _auth: AuthConfig) {
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

  getCacheItemStructure(_config: IntegrationConfig, _auth: AuthConfig) {
    //TODO: implementation
    return Promise.resolve({ foo: 'bar' })
  }
}
