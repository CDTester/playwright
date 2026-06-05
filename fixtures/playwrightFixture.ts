import { test as base } from '@playwright/test';
import { HomePage } from '../pages/Playwright/HomePage';
import { MenuPage } from '../pages/Playwright/MenuPage';
import envData from '../utils/loadEnvData';

type PageFixtures = {
  homePage: HomePage;
  menuPage: MenuPage;
  envData: object;
};

export const test = base.extend<PageFixtures>({
  envData: [async ({}, use: (data:object) => Promise<void>) => {
    const data = envData.getEnvData();
    await use(data); 
  }, { scope: 'worker' }],
  homePage: async ({ page, envData }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const homePage = new HomePage(page, envData);

    // All that is in the test itself is after the await use
    await use(homePage);

    // this is what was in the afterEach of test.spec.ts
    // (none in this case)
  },
    menuPage: async ({ page, envData }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const menuPage = new MenuPage(page, envData);

    // All that is in the test itself is after the await use
    await use(menuPage);

    // this is what was in the afterEach of test.spec.ts
    // (none in this case)
  }
    //, you can add more fixtures here
});

export { expect } from '@playwright/test';