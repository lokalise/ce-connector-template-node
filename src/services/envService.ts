const getLocales = async (accessToken: string) => {
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

const getCacheItemStructure = async () => {
  //TODO: implementation
  return Promise.resolve({ foo: 'bar' })
}

const envService = {
  getLocales,
  getCacheItemStructure,
}

export default envService
