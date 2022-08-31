const getLocales = async (accessToken: string) => {
  //TODO: implementation
  return {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
      },
    ],
  }
}

const getCacheItemStructure = async () => {
  //TODO: implementation
  return { foo: 'bar' }
}

const envService = {
  getLocales,
  getCacheItemStructure,
}

export default envService
