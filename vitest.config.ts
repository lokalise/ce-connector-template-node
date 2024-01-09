import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 1,
      }
    },
    watch: false,
    environment: 'node',
    setupFiles: ['test/dotenvConfig.ts'],
    reporters: ['default'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [
        'src/app.ts',
        'src/server.ts',
        'src/infrastructure/diConfig.ts',
        'src/infrastructure/errors/globalErrorHandler.ts',
        'src/utils/typeUtils.ts'
      ],
      reporter: ['text'],
      all: true,
      thresholds: {
        lines: 70,
        functions: 60,
        branches: 65,
        statements: 70,
      },
    },
  },
})
