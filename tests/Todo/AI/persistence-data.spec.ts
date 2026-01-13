// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Persistence and LocalStorage', { tag: ['@Todo', '@Persistence'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });
  });

  test('Todo items persist after page reload',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Persistence and LocalStorage');
    await allure.story('Story: Data persistence after reload');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. When I add items 'Buy milk' and 'Walk the dog'
    await allure.step('WHEN I add items "Buy milk" and "Walk the dog"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
    });

    // 2. And I mark 'Buy milk' as complete
    await allure.step('AND I mark "Buy milk" as complete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
    });

    // 3. And I reload the page
    await allure.step('AND I reload the page', async (step) => {
      await page.reload();
    });

    // 4. Then 'Buy milk' and 'Walk the dog' are still in the list
    await allure.step('THEN "Buy milk" and "Walk the dog" are still in the list', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const walkDogItem = page.locator('li').filter({ hasText: 'Walk the dog' });
      await expect(buyMilkItem, 'Buy milk should persist').toBeVisible();
      await expect(walkDogItem, 'Walk the dog should persist').toBeVisible();
    });

    // 5. And 'Buy milk' is still marked as complete
    await allure.step('AND "Buy milk" is still marked as complete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await expect(checkbox, 'Buy milk should remain checked').toBeChecked();
    });

    // 6. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });
  });
});
