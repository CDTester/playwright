# playwright
Repo to learn Playwright


[![Test Status](https://github.com/CDTester/playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/CDTester/playwright/actions/workflows/playwright.yml)
[![Test Report](https://github.com/CDTester/playwright/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/CDTester/playwright/actions/workflows/pages/pages-build-deployment)

## Latest Build Report
https://cdtester.github.io/playwright/




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

## Browser 
A browser has the following set-up:
- context - provides a way to operate independent browser sessions. 
- pages - A context can contain multiple pages. This will share resources of the context. e.g. cookies. Page provides methods to interact with a single tab in a browser

## Page Obejct Model
TBC

### Base Page
TBC

### Web Page
TBC

## Fixture
TBC
