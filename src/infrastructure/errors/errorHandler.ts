import type { NotifiableError } from '@bugsnag/js'
import { reportErrorToBugsnag } from '@lokalise/fastify-extras'
import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import pino from 'pino'
import { ZodError } from 'zod'

import { isObject } from '../../types'

import { InternalError } from './InternalError'
import { PublicNonRecoverableError } from './PublicNonRecoverableError'

import stdSerializers = pino.stdSerializers

type ResponseObject = {
  statusCode: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any> | string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveLogObject(error: unknown): Record<string, any> {
  if (error instanceof InternalError) {
    return {
      message: error.message,
      code: error.errorCode,
      details: error.details ? JSON.stringify(error.details) : undefined,
      error: stdSerializers.err({
        name: error.name,
        message: error.message,
        stack: error.stack,
      }),
    }
  }

  return {
    message: isObject(error) ? error.message : JSON.stringify(error),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    error: error instanceof Error ? stdSerializers.err(error) : error,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveResponseObject(error: Record<string, any>): ResponseObject {
  if (error instanceof PublicNonRecoverableError) {
    return {
      statusCode: error.httpStatusCode ?? 500,
      payload: {
        message: error.message,
        errorCode: error.errorCode,
        details: error.details,
      },
    }
  }

  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      payload: {
        message: 'Invalid params',
        details: {
          error: error.issues,
        },
      },
    }
  }

  return {
    statusCode: 500,
    payload: 'Internal Server Error',
  }
}

export const errorHandler = function (
  this: FastifyInstance,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Record<string, any>,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  const logObject = resolveLogObject(error)
  const responseObject = resolveResponseObject(error)

  if (responseObject.statusCode === 500) {
    reportErrorToBugsnag({
      error: error as NotifiableError,
    })
  }

  this.log.error(logObject)
  void reply.status(responseObject.statusCode).send(responseObject.payload)
}
