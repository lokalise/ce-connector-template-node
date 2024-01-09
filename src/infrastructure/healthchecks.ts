import type {
  HealthChecker,
  HealthcheckResult,
  PrometheusHealthCheck,
} from '@lokalise/fastify-extras'
import type { Either } from '@lokalise/node-core'
import { executeSettleAllAndHandleGlobalErrors } from '@lokalise/node-core'
import type { FastifyInstance } from 'fastify'

export const wrapHealthCheck = (app: FastifyInstance, healthCheck: HealthChecker) => {
  return async () => {
    const response = await healthCheck(app)
    if (response.error) {
      throw response.error
    }
  }
}

export const wrapHealthCheckForPrometheus = (
  healthCheck: HealthChecker,
  healthcheckName: string,
): PrometheusHealthCheck => {
  return {
    name: healthcheckName,
    checker: async (app: FastifyInstance): Promise<HealthcheckResult> => {
      const startTime = Date.now()
      const response = await healthCheck(app)
      const checkTimeInMsecs = Date.now() - startTime

      return {
        checkPassed: !!response.result,
        checkTimeInMsecs,
      }
    },
  }
}

export function registerHealthChecks(app: FastifyInstance) {
  app.addHealthCheck('heartbeat', () => true)
}

export const dummyHealthCheck: HealthChecker = async (app): Promise<Either<Error, true>> => {
  return Promise.resolve({ result: true })
}

export async function runAllHealthchecks(app: FastifyInstance) {
  return executeSettleAllAndHandleGlobalErrors([], false)
}
