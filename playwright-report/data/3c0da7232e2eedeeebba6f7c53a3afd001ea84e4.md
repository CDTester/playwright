# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login/herokuappLogin.spec.ts >> The-internet.herokuapp Login Page Tests >> The user can access the secure page when storage state is used
- Location: tests/Login/herokuappLogin.spec.ts:121:7

# Error details

```
Fixture "loggedInState" timeout of 30000ms exceeded during setup.
```

# Test source

```ts
  1  | import { test as base, Page } from '@playwright/test';
  2  | import { LoginPage } from '../pages/Herokuapp/LoginPage';
  3  | import { LoginSecurePage } from '../pages/Herokuapp/LoginSecurePage';
  4  | import { ChallengingDomPage } from '../pages/Herokuapp/ChallengingDomPage';
  5  | import { HerokuappData } from '../test-data/pages/LoginData/HerokuappData';
  6  | import { HerokuappAuth } from '../test-data/pages/LoginData/HerokuappAuth';
  7  | import { attachment } from 'allure-js-commons';
  8  | import * as fs from 'fs';
  9  | 
  10 | type TestFixtures = {
  11 |   loginPage: LoginPage;
  12 |   securePage: LoginSecurePage;
  13 |   userData: typeof HerokuappData;
  14 |   tablesPage: ChallengingDomPage;
  15 | };
  16 | 
  17 | type WorkerFixtures = {
  18 |   loggedInState: LoginSecurePage;
  19 |   envData: object;
  20 | };
  21 | 
> 22 | export const test = base.extend<TestFixtures, WorkerFixtures>({
     |                          ^ Fixture "loggedInState" timeout of 30000ms exceeded during setup.
  23 |   envData: [async ({}, use: (data:object) => Promise<void>) => {
  24 |     const envDataString: string = process.env.envData as string;
  25 |     const data: object = JSON.parse(envDataString) ;
  26 |     await use(data); 
  27 |   }, { scope: 'worker' }],
  28 |   loginPage: async ({ page, envData }, use) => {
  29 |     const loginPage = new LoginPage(page, envData);
  30 |     await use(loginPage);
  31 |   },
  32 |   securePage: async ({ page, envData }, use) => {
  33 |     const securePage = new LoginSecurePage(page, envData);
  34 |     await use(securePage);
  35 |   },
  36 |   tablesPage: async ({ page, envData }, use) => {
  37 |     const tablesPage = new ChallengingDomPage(page, envData);
  38 |     await use(tablesPage);
  39 |   },
  40 |   userData: async ({}, use) => {
  41 |     await use(HerokuappData);
  42 |   },
  43 |   loggedInState: [async ({ browser, envData }, use) => {
  44 |     const auth = new HerokuappAuth();
  45 |     const device = browser.browserType().name();
  46 | 
  47 |     // storage state file created by chrome cannot be used by webkit as it enforces stricter rules on cookies and origins
  48 |     const sessionPath = `tmp/auth/herokuapp/authState.${device}.json`;
  49 | 
  50 |     if (await fs.existsSync(sessionPath)) {
  51 |       console.log('StorageState already created');
  52 |     }
  53 |     else {
  54 |       await auth.setup(device, sessionPath, envData);
  55 |     }
  56 | 
  57 |     // Create new context with stored authentication
  58 |     const context = await browser.newContext({ storageState: sessionPath });
  59 |     const page = await context.newPage();
  60 |     const securePage = new LoginSecurePage(page, envData);
  61 |     await use(securePage);
  62 |     
  63 |     // Cleanup
  64 |     await context.close();
  65 |   }, { scope: 'worker' }]
  66 | });
  67 | 
  68 | // Fixture to automatically attach trace on test failure
  69 | export const testWithTrace = base.extend({
  70 |   page: async ({ page }, use, testInfo) => {
  71 |     await use(page);
  72 |     
  73 |     console.log(`Test status: ${testInfo.status}, expected: ${testInfo.expectedStatus}`);
  74 |     // Attach trace if test failed
  75 |     if (testInfo.status !== testInfo.expectedStatus) {
  76 |       const tracePath = testInfo.outputPath('trace.zip');
  77 |       console.log(`Attaching trace from: ${tracePath}`);
  78 |       // Check if trace file exists
  79 |       if (fs.existsSync(tracePath)) {
  80 |         const traceBuffer = fs.readFileSync(tracePath);
  81 |         await attachment('Trace', traceBuffer, 'application/zip');
  82 |       }
  83 |     }
  84 |   },
  85 | });
  86 | 
  87 | export { expect, TestDetailsAnnotation } from '@playwright/test';
```