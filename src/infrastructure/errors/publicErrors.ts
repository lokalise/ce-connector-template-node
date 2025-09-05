import { PublicNonRecoverableError } from '@lokalise/node-core'

export type CommonErrorParams = {
  message: string
  // biome-ignore lint/suspicious/noExplicitAny: this is intentionally loose
  details?: Record<string, any>
}

export type OptionalMessageErrorParams = {
  message?: string
  // biome-ignore lint/suspicious/noExplicitAny: this is intentionally loose
  details?: Record<string, any>
}

export class EntityNotFoundError extends PublicNonRecoverableError {
  constructor(params: CommonErrorParams) {
    super({
      message: params.message,
      errorCode: 'ENTITY_NOT_FOUND',
      httpStatusCode: 404,
      details: params.details,
    })
  }
}

export class CouldNotRetrieveCacheItemsError extends PublicNonRecoverableError {
  constructor(details?: Record<string, unknown>) {
    super({
      message: 'Could not retrieve cache items',
      errorCode: 'COULD_NOT_RETRIEVE_CACHE_ITEMS',
      httpStatusCode: 403,
      details,
    })
  }
}

export class EmptyTokenError extends PublicNonRecoverableError {
  constructor(params: OptionalMessageErrorParams = {}) {
    super({
      message: params.message ?? 'Empty token',
      errorCode: 'EMPTY_TOKEN',
      httpStatusCode: 401,
      details: params.details,
    })
  }
}

export class ThirdPartyAuthenticationError extends PublicNonRecoverableError {
  constructor(params: OptionalMessageErrorParams = {}) {
    super({
      message: params.message ?? 'Authentication to third party service failed',
      errorCode: 'AUTH_ERROR',
      httpStatusCode: 403,
      details: params.details,
    })
  }
}

export class OAuthNotSupportedError extends PublicNonRecoverableError {
  constructor(connectorName: string) {
    super({
      message: 'OAUTH auth not supported by connector',
      errorCode: 'OAUTH_AUTH_NOT_SUPPORTED',
      httpStatusCode: 400,
      details: {
        connectorName,
      },
    })
  }
}

export class ApiTokenNotSupportedError extends PublicNonRecoverableError {
  constructor(connectorName: string) {
    super({
      message: 'API token auth not supported by connector',
      errorCode: 'API_TOKEN_AUTH_NOT_SUPPORTED',
      httpStatusCode: 400,
      details: {
        connectorName,
      },
    })
  }
}
