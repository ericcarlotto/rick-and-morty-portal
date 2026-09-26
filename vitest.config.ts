import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

const contract = fileURLToPath(new URL('./packages/contract/src/index.ts', import.meta.url));
const fontMock = fileURLToPath(new URL('./apps/web/test/font-mock.ts', import.meta.url));

const swcPlugin = swc.vite({
  module: { type: 'es6' },
  jsc: {
    parser: { syntax: 'typescript', decorators: true },
    transform: { legacyDecorator: true, decoratorMetadata: true },
  },
});

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary'],
      include: [
        'apps/bff/src/**/*.ts',
        'apps/web/app/**/*.{ts,tsx}',
        'apps/web/src/**/*.{ts,tsx}',
        'apps/web/next.config.ts',
      ],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      thresholds: {
        lines: 96,
        functions: 96,
        branches: 96,
        statements: 96,
        'apps/bff/src/**/*.ts': {
          lines: 100,
          functions: 100,
          branches: 100,
          statements: 100,
        },
        'apps/web/**/*.{ts,tsx}': {
          lines: 96,
          functions: 96,
          branches: 96,
          statements: 96,
        },
      },
    },
    projects: [
      {
        plugins: [swcPlugin],
        resolve: { alias: { '@rick/contract': contract } },
        esbuild: {
          target: 'es2022',
          tsconfigRaw: {
            compilerOptions: {
              experimentalDecorators: true,
              useDefineForClassFields: false,
            },
          },
        },
        test: {
          name: 'server',
          environment: 'node',
          include: ['apps/bff/**/*.test.ts', 'packages/contract/**/*.test.ts'],
        },
      },
      {
        plugins: [react()],
        resolve: {
          alias: {
            '@rick/contract': contract,
            'next/font/google': fontMock,
          },
        },
        test: {
          name: 'web',
          environment: 'jsdom',
          include: ['apps/web/**/*.test.ts', 'apps/web/**/*.test.tsx'],
          setupFiles: ['./apps/web/test/setup.ts'],
          fileParallelism: false,
        },
      },
    ],
  },
});
