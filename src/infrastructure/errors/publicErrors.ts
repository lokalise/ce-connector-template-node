import { PublicNonRecoverableError } from './PublicNonRecoverableError'

export type CommonErrorParams = {
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>
}

export type OptionalMessageErrorParams = {
  message?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export class AuthFailedError extends PublicNonRecoverableError {
  constructor(params: OptionalMessageErrorParams = {}) {
    super({
      message: params.message ?? 'Authentication failed',
      errorCode: 'AUTH_FAILED',
      httpStatusCode: 401,
      details: params.details,
    })
  }
}
