import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

type PageFixtures = {
  homePage: HomePage;
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
  }
    //, you can add more fixtures here
});

export { expect } from '@playwright/test';