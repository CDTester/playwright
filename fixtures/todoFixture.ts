import { test as base, Locator } from '@playwright/test';
import { TodoPage } from '../pages/Todo/TodoPage';

type PageFixtures = {
  todoPage: TodoPage;
  // add more pages if needed
};

export const test = base.extend<PageFixtures>({
  todoPage: async ({ page }, use) => {
    // this is what was in the beforeEach of test.spec.ts
    const todoPage = new TodoPage(page);

    // removing goto from here to allow allure.step to capture step parameter in the test
    // step.parameter('URL', todoPage.url) does not work in fixtures, so use attachment
    
    // await step('Navigate to ToDoMVC App', async (step) => {
    //   await attachment('URL', todoPage.url, 'text/plain');
    //   await todoPage.goto();
    // });
 
    // All that is in the test itself is after the await use
    await use(todoPage);

    // this is what was in the afterEach of test.spec.ts
    await todoPage.removeAll();
  }
  //, you can add more fixtures here
});

export { expect } from '@playwright/test';