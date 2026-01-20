import { test as base, Page } from '@playwright/test';
import { HerokuappLoginPage } from '../pages/Login/HerokuappLoginPage';
import { HerokuappSecurePage } from '../pages/Login/HerokuappSecurePage';
import { HerokuappData } from '../test-data/pages/LoginData/HerokuappData';
import { HerokuappAuth } from '../test-data/pages/LoginData/HerokuappAuth';
import { attachment } from 'allure-js-commons';
import * as fs from 'fs';

type PageFixtures = {
  loginPage: HerokuappLoginPage;
  securePage: HerokuappSecurePage;
  userData: typeof HerokuappData;
  loggedInState: HerokuappSecurePage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new HerokuappLoginPage(page);
    await use(loginPage);
  },
  securePage: async ({ page }, use) => {
    const securePage = new HerokuappSecurePage(page);
    await use(securePage);
  },
  userData: async ({}, use) => {
    await use(HerokuappData);
  },
  loggedInState: async ({ browser }, use) => {
    const auth = new HerokuappAuth();
    await auth.setup();
    const sessionPath = '../test-data/pages/LoginData/authState.herokuapp.json';
    if (await fs.existsSync(sessionPath)) {
      console.log('Auth state created successfully');
    }
    else {
      console.log('Auth state was not created successfully');
    }

    // Create new context with stored authentication
    const context = await browser.newContext({ storageState: sessionPath });
    console.log(JSON.stringify(await context.storageState(), null, 2));
    const page = await context.newPage();
    const securePage = new HerokuappSecurePage(page);
    await use(securePage);
    
    // Cleanup
    await context.close();
  }
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