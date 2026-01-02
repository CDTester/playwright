import { test as base } from '@playwright/test';
import { HomePage } from '../pages/Playwright/HomePage';
import { MenuPage } from '../pages/Playwright/MenuPage';

type PageFixtures = {
  homePage: HomePage;
  menuPage: MenuPage;
  // add more pages if needed
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const homePage = new HomePage(page);

    // All that is in the test itself is after the await use
    await use(homePage);

    // this is what was in the afterEach of test.spec.ts
    // (none in this case)
  },
    menuPage: async ({ page }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const menuPage = new MenuPage(page);

    // All that is in the test itself is after the await use
    await use(menuPage);

    // this is what was in the afterEach of test.spec.ts
    // (none in this case)
  }
    //, you can add more fixtures here
});

export { expect } from '@playwright/test';