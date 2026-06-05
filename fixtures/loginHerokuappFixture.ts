import { test as base, Page } from '@playwright/test';
import { HerokuappLoginPage } from '../pages/Login/HerokuappLoginPage';
import { HerokuappSecurePage } from '../pages/Login/HerokuappSecurePage';
import { HerokuappData } from '../test-data/pages/LoginData/HerokuappData';
import { HerokuappAuth } from '../test-data/pages/LoginData/HerokuappAuth';
import { attachment } from 'allure-js-commons';
import envData from '../utils/loadEnvData';
import * as fs from 'fs';

type TestFixtures = {
  loginPage: HerokuappLoginPage;
  securePage: HerokuappSecurePage;
  userData: typeof HerokuappData;
  envData: object;
};

type WorkerFixtures = {
  loggedInState: HerokuappSecurePage;
  envData: object;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  envData: [async ({}, use: (data:object) => Promise<void>) => {
    const data = envData.getEnvData();
    await use(data); 
  }, { scope: 'worker' }],
  loginPage: async ({ page, envData }, use) => {
    const loginPage = new HerokuappLoginPage(page, envData);
    await use(loginPage);
  },
  securePage: async ({ page, envData }, use) => {
    const securePage = new HerokuappSecurePage(page, envData);
    await use(securePage);
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
    const securePage = new HerokuappSecurePage(page, envData);
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

export { expect } from '@playwright/test';