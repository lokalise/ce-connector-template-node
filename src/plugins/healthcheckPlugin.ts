import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

function plugin(fastify: FastifyInstance, opts: unknown, done: () => void) {
  fastify.addHealthCheck('heartbeat', () => true)

  done()
}

export const healthcheckPlugin = fp(plugin, {
  fastify: '4.x',
  name: 'healthcheck-plugin',
})
