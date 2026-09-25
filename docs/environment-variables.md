# Environment variables

## App

- `APP_PORT` (optional)  
  Type: `integer`  
  Description: HTTP server listening port  
  Default: `3000`

- `APP_BIND_ADDRESS` (required)  
  Type: `string`  
  Description: HTTP server binding address (e.g., 0.0.0.0 for all interfaces)

- `LOG_LEVEL` (required)  
  Type: `string`  
  Description: Minimum log level for emitted logs  
  Supported values: `fatal` | `error` | `warn` | `info` | `debug` | `trace` | `silent`

- `NODE_ENV` (required)  
  Type: `string`  
  Description: Application execution environment  
  Supported values: `production` | `development` | `test`

- `APP_ENV` (required)  
  Type: `string`  
  Description: Deployment environment for the application  
  Supported values: `production` | `development` | `staging`

- `APP_VERSION` (optional)  
  Type: `string`  
  Description: Application version exposed via healthcheck endpoint  
  Default: `VERSION_NOT_SET`

- `GIT_COMMIT_SHA` (optional)  
  Type: `string`  
  Description: Git commit SHA of the deployed version  
  Default: `COMMIT_SHA_NOT_SET`

## Integrations FakeStore

- `SAMPLE_FAKE_STORE_BASE_URL` (required)  
  Type: `string`  
  Description: Base URL of the sample Fake Store API, e.g. https://fakestoreapi.com

## Vendors Newrelic

- `NEW_RELIC_ENABLED` (optional)  
  Type: `boolean`  
  Description: Whether to use New Relic instrumentation  
  Default: `true`

- `NEW_RELIC_APP_NAME` (optional)  
  Type: `string`  
  Description: Instrumented application name for New Relic grouping purposes  
  Default: ``

## Vendors Bugsnag

- `BUGSNAG_ENABLED` (optional)  
  Type: `boolean`  
  Description: Whether to send errors to Bugsnag  
  Default: `true`

- `BUGSNAG_KEY` (optional)  
  Type: `string`  
  Description: Bugsnag API key
