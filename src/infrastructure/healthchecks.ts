import type { HealthCheck } from '@lokalise/fastify-extras'
import { executeAsyncAndHandleGlobalErrors } from '@lokalise/node-core'
import type { FastifyInstance } from 'fastify'

export const wrapHealthCheck = (app: FastifyInstance, healthCheck: HealthCheck) => {
  return async () => {
    const response = await healthCheck(app)
    if (response.error) {
      throw response.error
    }
  }
}
export function registerHealthChecks(app: FastifyInstance) {
  app.addHealthCheck('heartbeat', () => true)
  // Example of a wrapped healthcheck
  // app.addHealthCheck('mysql', wrapHealthCheck(app, dbHealthCheck))
}

export async function runAllHealthchecks(app: FastifyInstance) {
  return executeAsyncAndHandleGlobalErrors(
    () =>
      Promise.all([
        // Example of an async healthcheck
        // wrapHealthCheck(app, dbHealthCheck)(),
      ]),
    false,
  )
}
