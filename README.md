# playwright
Repo to learn Playwright

## Build Status
[![Test Status](https://github.com/CDTester/playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/CDTester/playwright/actions/workflows/playwright.yml)
[![Test Report](https://github.com/CDTester/playwright/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/CDTester/playwright/actions/workflows/pages/pages-build-deployment)

## Latest CI/CD Build Report
https://cdtester.github.io/playwright/playwright/
https://cdtester.github.io/playwright/allure/





## Playwright

### Browser 
A browser has the following set-up:
- context - provides a way to operate independent browser sessions. 
- pages - A context can contain multiple pages. This will share resources of the context. e.g. cookies. Page provides methods to interact with a single tab in a browser

### Base Page
The Base page can provide common functions to be used for each test script. They can contain tear up and tear down features.

### Page Obejct Model
Page Object Models provides locators and methods to interact with a specific web page. These pages acn be imported into any test script or fixture to speed up writing and maintaining tests. Any changes to a page only need to be updated in one place. 

The Page Object Model extends the Base Page.

### Fixtures
Fixture files are used to group together Page Object Models, these files can also contain tear up and tear down procedures for those specific group of POMs. The test scripts import the fixture which should contain everything that test needs to run.

### Annotations
Playwright supports tags and annotations that are displayed in the test report.
- test.skip() marks the test as irrelevant and is not executed by Playwright.
- test.fail() marks the test as failing and is executed by Playwright. If the test does not fail, Playwright will complain.
- test.fixme() marks the test as failing and is not executed by Playwright. Use fixme when running the test is slow or crashes.
- test.slow() marks the test as slow and triples the test timeout.
- test.describe() groups together tests to give then the same logical name/feature.
- test('scenario', { tag: [@smoke, @feature] }) tags are a great way to run certain tests in your library by running `npx playwright test --grep @smoke` or ignoring specific tags by running `npx playwright test --grep-invert @smoke`
- test.beforeEach() will run tear up procedures before each test in the group.
- test.afterEach() will run tear down procedures after each test in the group.

### Executing Playwright Tests
Playwright scripts can be executed using the command
```
npx playwright test
```

In this repo, environment specific values are stored in a config file. This contains values like urls, usernames, passwords etc. The module that gets these values requires the env name to be stored in the `process.env` variables. The way I do this is by using package script, e.g.

```json
  "scripts": {
    "test": "playwright test",
    "testChrome": "playwright test --project=chromium",
    "testWebkit": "playwright test --project=webkit"
  },
```

Then running the scripts using:
```
npm run test --testenv=dev1
```

### Reporter
Playwright comes with a built in reporters:
- list. 
```shell
Running 3 tests using 2 workers
  ✓  1 …sts\Todo\add.spec.ts:45:7 › Add Todo › Item should be cleared from the input field when an item is added @Todo @Add @regression (2.8s)  
  ✓  2 [chromium] › tests\Todo\add.spec.ts:24:7 › Add Todo › Allow an item to be added to ToDo @Todo @Add @smoke (7.1s)
  ✓  3 [chromium] › tests\Todo\add.spec.ts:64:7 › Add Todo › Item should be appended to the bottom of the list @Todo @Add @regression (2.1s)
```
- line.
```shell
Running 3 tests using 2 workers
  3 passed (8.8s)
```
- dot.
```shell
Running 3 tests using 2 workers
···
  3 passed (7.7s)
```
- html. These are opened automatically if the test fails.
```shell
Running 3 tests using 2 workers
  3 passed (10.0s)

To open last HTML report run:
  npx playwright show-report
```
**Summary**
![playwright report summary](./docs/playwright_html_report.png)

**Steps**

![playwright report steps](./docs/playwright_html_report_steps.png)


These can be viewed either by:
- `npx playwright test --reporter=line` This runs the test then launches the reporter
- In the `playwright.config.ts` file.  
```Typescript 
export default defineConfig({
  reporter: [    ['html'] ]
})
```

### Playwright config
The `playwright.config.ts` file configures how your test run.
- `testDir: './tests'` Location of tests. When running `npx playwright test` this is the location of the tests to be run
- `fullyParallel: true`  Allows tests to be run in parallel mode. 
- `workers: process.env.CI ? 4 : undefined` This tells the CI process to use 4 workers in parallel mode or use default number for local runs.
- `reporter: [['html'], ['allure-playwright, {options}']]` This defines what reporters to be used including the config for each reporter.
- `use: {}` Options:
    - `headless: true`. Sets whether tests are to be run headless or not.
    - `screenshot: 'only-on-failure'`. Other option are on, off, retain-on-failure
    - `video: 'retain-on-failure'`. Other options are on, off, on-first-retry
    - `viewport: { width: 1200, height: 700 }`. Sets screen size. 
    - `geolocation: { latitude: 29.97918, longitude: 31.13420 }`. Sets user location
- `projects: []`. Configures projects for test to be run on different browsers
    - `{name: 'chromium', use: { ...devices['Desktop Chrome'] } }`
    - `{name: 'firefox', use: { ...devices['Desktop Firefox'] } }`
    - `{name: 'webkit', use: { ...devices['Desktop Safari'] } }`
    - `{name: 'Mobile Safari', use: { ...devices['iPhone 12'], isMobile: true } }`

### Agent - Planner
TBC

### Agent - Generator
TBC

### Agent - Healer
TBC



## Allure
TBC