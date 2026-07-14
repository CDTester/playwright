import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/PlaywrightDemo/TodoPage';
import { ApiMockingPage } from '../pages/PlaywrightDemo/ApiMockingPage';

type PageFixtures = {
  todoPage: TodoPage;
  apiMockingPage: ApiMockingPage;
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
  todoPage: async ({ page, envData }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const todoPage = new TodoPage(page, envData);
 
    // All that is in the test itself is after the await use
    await use(todoPage);

    // this is what was in the afterEach of test.spec.ts
    await todoPage.removeAll();
  },
  apiMockingPage: async ({ page, envData }, use) => {
    const apiMockingPage = new ApiMockingPage(page, envData);
    await use(apiMockingPage);
  }
});

export { expect, TestDetailsAnnotation, Locator  } from '@playwright/test';