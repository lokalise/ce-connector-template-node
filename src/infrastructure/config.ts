import { createConfig, detectNodeEnv, envvar, type InferEnv } from 'envase'
import { z } from 'zod'

export const nodeEnv = detectNodeEnv(process.env)

const envSchema = {
  app: {
    port: envvar(
      'APP_PORT',
      z.coerce.number().int().default(3000).describe('HTTP server listening port'),
    ),
    bindAddress: envvar(
      'APP_BIND_ADDRESS',
      z.string().describe('HTTP server binding address (e.g., 0.0.0.0 for all interfaces)'),
    ),
    logLevel: envvar(
      'LOG_LEVEL',
      z
        .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
        .describe('Minimum log level for emitted logs'),
    ),
    nodeEnv: envvar(
      'NODE_ENV',
      z.enum(['production', 'development', 'test']).describe('Application execution environment'),
    ),
    appEnv: envvar(
      'APP_ENV',
      z
        .enum(['production', 'development', 'staging'])
        .describe('Deployment environment for the application'),
    ),
    appVersion: envvar(
      'APP_VERSION',
      z
        .string()
        .default('VERSION_NOT_SET')
        .describe('Application version exposed via healthcheck endpoint'),
    ),
    gitCommitSha: envvar(
      'GIT_COMMIT_SHA',
      z.string().default('COMMIT_SHA_NOT_SET').describe('Git commit SHA of the deployed version'),
    ),
  },
  integrations: {
    fakeStore: {
      baseUrl: envvar(
        'SAMPLE_FAKE_STORE_BASE_URL',
        z.string().describe('Base URL of the sample Fake Store API, e.g. https://fakestoreapi.com'),
      ),
    },
  },
  vendors: {
    newrelic: {
      isEnabled: envvar(
        'NEW_RELIC_ENABLED',
        z.stringbool().default(true).describe('Whether to use New Relic instrumentation'),
      ),
      appName: envvar(
        'NEW_RELIC_APP_NAME',
        z
          .string()
          .default('')
          .describe('Instrumented application name for New Relic grouping purposes'),
      ),
    },
    bugsnag: {
      isEnabled: envvar(
        'BUGSNAG_ENABLED',
        z.stringbool().default(true).describe('Whether to send errors to Bugsnag'),
      ),
      apiKey: envvar('BUGSNAG_KEY', z.string().optional().describe('Bugsnag API key')),
    },
  },
}

// biome-ignore lint/style/noDefaultExport: envase uses default export to generate docs
export default envSchema

export type Config = InferEnv<typeof envSchema>
export type AppConfig = Config['app']

let config: Config | null = null

export function getConfig(): Config {
  if (!config) {
    config = createConfig(process.env, {
      schema: envSchema,
      // Blank values count as unset (the ConfigScope convention): defaults apply and blank
      // mandatory values are reported as missing
      emptyStringAsUndefined: true,
    })
  }
  return config
}
