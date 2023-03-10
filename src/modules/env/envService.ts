import type { AuthConfig, IntegrationConfig } from 'src/types'

const getLocales = async (config: IntegrationConfig, auth: AuthConfig) => {
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

const getCacheItemStructure = async (config: IntegrationConfig, auth: AuthConfig) => {
  //TODO: implementation
  return Promise.resolve({ foo: 'bar' })
}

const envService = {
  getLocales,
  getCacheItemStructure,
}

export default envService
