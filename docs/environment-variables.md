# Environment variables

In development, environment variables are resolved from the .env file
In production you are expected to set environment variables during deployment (e. g. using Vault)

## List of environment variables

### app

- `APP_NAME` - 
- `CLUSTER` -
- `GIT_REPO_NAME` -
- `GIT_BASE_BRANCH` -
- `HOST_APP_PORT` - External ports used in dev docker-compose.yml

- `NODE_ENV` - app execution mode. Supported values: `production` | `development` | `test`
- `APP_ENV` - environment, in which app is running. Supported values: `production` | `development` | `staging`
- `APP_BIND_ADDRESS` - address, on which server will be listening for HTTP(S) connections. e. g. `0.0.0.0`
- `LOG_LEVEL` - logs starting from which level should be emitted. Supported values: `fatal` | `error` | `warn` | `info` | `debug` | `trace` | `silent`
- (OPTIONAL) `APP_PORT` - port, on which server will be listening for HTTP(S) connections (`3000`)
- (OPTIONAL) `APP_VERSION` - application version, exposed via healthcheck endpoint (`VERSION_NOT_SET`)
- (OPTIONAL) `GIT_COMMIT_SHA` - SHA of a last commit of the deployed version (`COMMIT_SHA_NOT_SET`)

## new relic

- (OPTIONAL) `NEW_RELIC_LICENSE_KEY` - New Relic API key
- (OPTIONAL) `NEW_RELIC_APP_NAME` - instrumented application name for New Relic grouping purposes
- (OPTIONAL) `NEW_RELIC_ENABLED` - whether to use New Relic instrumentation (`true`)

### bugsnag

- (OPTIONAL) `BUGSNAG_KEY` - BugSnag API key
- (OPTIONAL) `BUGSNAG_ENABLED` - whether to send errors to BugSnag (`true`)
