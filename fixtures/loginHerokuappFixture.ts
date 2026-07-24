import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/Herokuapp/LoginPage';
import { LoginSecurePage } from '../pages/Herokuapp/LoginSecurePage';
import { ChallengingDomPage } from '../pages/Herokuapp/ChallengingDomPage';
import { HerokuappData } from '../test-data/pages/LoginData/HerokuappData';
import { HerokuappAuth } from '../test-data/pages/LoginData/HerokuappAuth';
import { attachment } from 'allure-js-commons';
import * as fs from 'fs';

type TestFixtures = {
  loginPage: LoginPage;
  securePage: LoginSecurePage;
  userData: typeof HerokuappData;
  tablesPage: ChallengingDomPage;
};

type WorkerFixtures = {
  loggedInState: LoginSecurePage;
  envData: object;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  envData: [async ({}, use: (data:object) => Promise<void>) => {
    const envDataString: string = process.env.envData as string;
    const data: object = JSON.parse(envDataString) ;
    await use(data); 
  }, { scope: 'worker' }],
  loginPage: async ({ page, envData }, use) => {
    const loginPage = new LoginPage(page, envData);
    await use(loginPage);
  },
  securePage: async ({ page, envData }, use) => {
    const securePage = new LoginSecurePage(page, envData);
    await use(securePage);
  },
  tablesPage: async ({ page, envData }, use) => {
    const tablesPage = new ChallengingDomPage(page, envData);
    await use(tablesPage);
  },
  userData: async ({}, use) => {
    await use(HerokuappData);
  },
  loggedInState: [async ({ browser, envData }, use) => {
    const auth = new HerokuappAuth();
    const device = browser.browserType().name();

    // storage state file created by chrome cannot be used by webkit as it enforces stricter rules on cookies and origins
    const sessionPath = `tmp/auth/herokuapp/authState.${device}.json`;

    if (await fs.existsSync(sessionPath)) {
      console.log('StorageState already created');
    }
    else {
      await auth.setup(device, sessionPath, envData);
    }

    // Create new context with stored authentication
    const context = await browser.newContext({ storageState: sessionPath });
    const page = await context.newPage();
    const securePage = new LoginSecurePage(page, envData);
    await use(securePage);
    
    // Cleanup
    await context.close();
  }, { scope: 'worker' }]
});

// Fixture to automatically attach trace on test failure
export const testWithTrace = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    
    console.log(`Test status: ${testInfo.status}, expected: ${testInfo.expectedStatus}`);
    // Attach trace if test failed
    if (testInfo.status !== testInfo.expectedStatus) {
      const tracePath = testInfo.outputPath('trace.zip');
      console.log(`Attaching trace from: ${tracePath}`);
      // Check if trace file exists
      if (fs.existsSync(tracePath)) {
        const traceBuffer = fs.readFileSync(tracePath);
        await attachment('Trace', traceBuffer, 'application/zip');
      }
    }
  },
});

export { expect, TestDetailsAnnotation } from '@playwright/test';