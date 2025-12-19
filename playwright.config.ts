/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright',{
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      categories: [
        { name: 'Critical failures', messageRegex: '.*critical.*' },
        { name: 'test script failures', messageRegex: '.*Error: locator.*' }
      ],
      environmentInfo: { 
        TEST_ENVIRONMENT: process.env.npm_config_testenv,
        NODE_VERSION: process.version, 
        OS: process.platform, 
        PLAYWRIGHT_VERSION: require('playwright/package.json').version, 
      },
      links: {
        issue: {
          urlTemplate: 'https://jira.example.com/browse/%s',
          nameTemplate: '%s'
        },
        tms: {
          urlTemplate: 'https://tms.example.com/testcase/%s',
          nameTemplate: '%s'
        }
      },
      openAlluredir: 'playwright-report/allure-results',
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    // set geolcation
    geolocation: { latitude: 29.97918, longitude: 31.13420 }, // Great Pyramid of Giza
    permissions: ['geolocation'],
    screenshot: 'only-on-failure', // on, off, retain-on-failure
    video: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
    viewport: { width: 1200, height: 700 },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer 
      when using allure, download trace and open zip using 'npm run showTrace <zip-file>'
    */
    trace: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

  },

  /* Configure projects for major browsers */
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

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsof},
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' 