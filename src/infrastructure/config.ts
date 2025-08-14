import { ConfigScope } from '@lokalise/node-core'

const configScope: ConfigScope = new ConfigScope()

export type Config = {
  integrations: {
    fakeStore: {
      baseUrl: string
    }
  }
  app: AppConfig
  vendors: {
    newrelic: {
      isEnabled: boolean
      appName: string
    }
    bugsnag: {
      isEnabled: boolean
      apiKey?: string
    }
  }
}

export type AppConfig = {
  port: number
  bindAddress: string
  logLevel: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent'
  nodeEnv: 'production' | 'development' | 'test'
  appEnv: 'production' | 'development' | 'staging'
  appVersion: string
  gitCommitSha: string
}

export function getConfig(): Config {
  return {
    app: getAppConfig(),
    integrations: {
      fakeStore: {
        baseUrl: configScope.getMandatory('SAMPLE_FAKE_STORE_BASE_URL'),
      },
    },
    vendors: {
      newrelic: {
        isEnabled: configScope.getOptionalBoolean('NEW_RELIC_ENABLED', true),
        appName: configScope.getOptionalNullable('NEW_RELIC_APP_NAME', ''),
      },
      bugsnag: {
        isEnabled: configScope.getOptionalBoolean('BUGSNAG_ENABLED', true),
        apiKey: configScope.getOptionalNullable('BUGSNAG_KEY', undefined),
      },
    },
  }
}

export function getAppConfig(): AppConfig {
  return {
    port: configScope.getOptionalInteger('APP_PORT', 3000),
    bindAddress: configScope.getMandatory('APP_BIND_ADDRESS'),
    logLevel: configScope.getMandatoryOneOf('LOG_LEVEL', [
      'fatal',
      'error',
      'warn',
      'info',
      'debug',
      'trace',
      'silent',
    ]),
    nodeEnv: configScope.getMandatoryOneOf('NODE_ENV', ['production', 'development', 'test']),
    appEnv: configScope.getMandatoryOneOf('APP_ENV', ['production', 'development', 'staging']),
    appVersion: configScope.getOptional('APP_VERSION', 'VERSION_NOT_SET'),
    gitCommitSha: configScope.getOptional('GIT_COMMIT_SHA', 'COMMIT_SHA_NOT_SET'),
  }
}

export function isDevelopment() {
  return configScope.isDevelopment()
}

export function isTest() {
  return configScope.isTest()
}

export function isProduction() {
  return configScope.isProduction()
}
