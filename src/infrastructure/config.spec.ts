import { afterEach, describe, expect, it, vi } from 'vitest'

// getConfig() memoises its result, so every test loads a fresh copy of the module.
const loadConfig = async (env: Record<string, string>) => {
  for (const [name, value] of Object.entries(env)) {
    vi.stubEnv(name, value)
  }
  vi.resetModules()
  const { getConfig } = await import('./config.ts')
  return getConfig()
}

describe('getConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  describe('blank values', () => {
    it('treats blank optional values as unset so their defaults apply', async () => {
      const config = await loadConfig({
        APP_PORT: '',
        NEW_RELIC_ENABLED: '',
        NEW_RELIC_APP_NAME: '',
        BUGSNAG_ENABLED: '',
        BUGSNAG_KEY: '',
      })

      expect(config.app.port).toBe(3000)
      expect(config.vendors.newrelic.isEnabled).toBe(true)
      expect(config.vendors.newrelic.appName).toBe('')
      expect(config.vendors.bugsnag.isEnabled).toBe(true)
      expect(config.vendors.bugsnag.apiKey).toBeUndefined()
    })

    it('reports a blank mandatory value as missing', async () => {
      await expect(loadConfig({ SAMPLE_FAKE_STORE_BASE_URL: '' })).rejects.toThrow(
        /\[SAMPLE_FAKE_STORE_BASE_URL]:\s+Invalid input: expected string, received undefined/,
      )
    })
  })

  it('rejects integers with trailing garbage', async () => {
    await expect(loadConfig({ APP_PORT: '3000abc' })).rejects.toThrow(/\[APP_PORT]/)
  })
})
