import { defineConfig } from 'vitest/config'

// biome-ignore lint/style/noDefaultExport: vite expects default export
export default defineConfig({
  test: {
    globals: true,
    poolOptions: {
      threads: {
        singleThread: true,
        isolate: false,
      },
    },
    pool: 'threads',
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
        'src/utils/typeUtils.ts',
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
