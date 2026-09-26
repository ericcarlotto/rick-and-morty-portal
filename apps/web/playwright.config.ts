import { defineConfig, devices } from '@playwright/test';

const web = 'http://127.0.0.1:3010';
const bff = 'http://127.0.0.1:4011';

export default defineConfig({
  testDir: './e2e',
  use: { ...devices['Desktop Chrome'], baseURL: web },
  webServer: [
    {
      command: 'npx tsx e2e/stub-bff.ts',
      url: `${bff}/api/health`,
      env: { STUB_PORT: '4011' },
      reuseExistingServer: false,
      timeout: 30_000,
    },
    {
      command: 'npx next dev --port 3010',
      url: web,
      env: { BFF_ORIGIN: bff },
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
