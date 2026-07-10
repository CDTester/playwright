import { test as base } from '@playwright/test';
import { IkeaHomePage } from '../pages/Ikea/IkeaHomePage';

type PageFixtures = {
  ikeaHomePage: IkeaHomePage;
};
type WorkerFixtures = {
  envData: object;
};

export const test = base.extend<PageFixtures, WorkerFixtures>({
  envData: [async ({}, use: (data:object) => Promise<void>) => {
    const envDataString: string = process.env.envData as string;
    const data: object = JSON.parse(envDataString) ;
    await use(data); 
  }, { scope: 'worker' }],
  ikeaHomePage: async ({ page, envData }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const ikeaHomePage = new IkeaHomePage(page, envData);

    // All that is in the test itself is after the await use
    await use(ikeaHomePage);
  }
});

export { expect } from '@playwright/test';