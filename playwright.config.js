/**
 * @module playwright.config
 */
import { defineConfig, devices } from '@playwright/test';

/**
 * Module-level base url value.
 * @type {*}
 */
const baseURL = process.env.E2E_BASE_URL || 'http://127.0.0.1:4173';

/**
 * Default export for playwright.config.
 * @type {object}
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'node scripts/e2e-server.js',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
        url: baseURL,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
