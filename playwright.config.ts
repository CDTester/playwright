/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';


// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,              // Run tests in files in parallel
  workers: process.env.CI ? 4 : 1,  // Opt out of parallel tests on CI by setting to 1. 
  forbidOnly: !!process.env.CI,     // Fail the build on CI if you accidentally left test.only in the source code.
  retries: process.env.CI ? 2 : 0,  // Retry on CI only
  reporter: [                       // Reporter to use. See https://playwright.dev/docs/test-reporters
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
  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    headless: process.env.CI ? true : false,
    geolocation: { latitude: 29.97918, longitude: 31.13420 }, // Set geolocation to Great Pyramid of Giza
    permissions: ['geolocation'],
    screenshot: 'only-on-failure', // on, off, retain-on-failure
    video: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
    viewport: { width: 1200, height: 700 },
    trace: 'retain-on-failure', // on, off, retain-on-failure, on-first-retry
    // baseURL: 'http://localhost:3000',  // This setsbaseURL for all tests, I am setting baseURL is set in env files and loaded in helpers
    // storageState: 'storageState.json',  // this sets storage state for all tests, I am setting storageState in fixtures where needed
  },

  // Configure projects for major browsers or for projects that require setup and teardown. These can also be run in fixtures.
  projects: [
    // {
    //   name:  'setup_db',
    //   testMatch: /.*\.setup\.ts/,
    //   use: {storageState: 'storageState.json'},
    //   teardown: 'cleanup_db'
    // },
    // {
    //   name: 'cleanup_db',
    //   testMatch: /.*\.teardown\.ts/
    // },
    // {
    //   name: 'apiUsers',
    //   use: { baseURL: env.apiUsers.baseUrl || process.env.BASE_URL || '' }
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      // dependencies: ['setup db'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: 'tests/Api/*', // ignoring API tests for Webkit as they are not relevant
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: 'tests/Api/*', // ignoring API tests for Webkit as they are not relevant
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