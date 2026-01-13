// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Complete Todo Items', { tag: ['@Todo', '@Complete'] }, () => {
  
  test.beforeEach('Setup items and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with items', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add two items for testing
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
    });
  });

  test('Mark item as complete',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Complete Todo Items');
    await allure.story('Story: Mark single item as complete');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. Given the app has items 'Buy milk' and 'Walk the dog'
    await allure.step('GIVEN the app has items "Buy milk" and "Walk the dog"', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      expect(count, 'Should have 2 items').toBe(2);
    });

    // 2. When I click the checkbox next to 'Buy milk'
    await allure.step('WHEN I click the checkbox next to "Buy milk"', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
    });

    // 3. Then 'Buy milk' is marked as complete
    await allure.step('THEN "Buy milk" is marked as complete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await expect(checkbox, '"Buy milk" checkbox should be checked').toBeChecked();
    });

    // 4. And 'Buy milk' is displayed with strike-through styling
    await allure.step('AND "Buy milk" is displayed with strike-through styling', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const label = buyMilkItem.locator('label');
      const classList = await label.evaluate(el => el.className);
      expect(classList, 'Completed item should have completed class').toContain('completed');
    });

    // 5. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should decrease to "1 item left"').toBeVisible();
    });
  });
});
