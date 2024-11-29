import type { HealthChecker } from '@lokalise/fastify-extras'
import type { Either } from '@lokalise/node-core'
import { executeSettleAllAndHandleGlobalErrors } from '@lokalise/node-core'
import type { FastifyInstance } from 'fastify'

export const dummyHealthCheck: HealthChecker = (_app): Promise<Either<Error, true>> => {
  return Promise.resolve({ result: true })
}

export function runAllHealthchecks(_app: FastifyInstance) {
  return executeSettleAllAndHandleGlobalErrors([], false)
}
