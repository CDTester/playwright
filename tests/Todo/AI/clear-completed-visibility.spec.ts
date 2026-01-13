// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Clear Completed Items', { tag: ['@Todo', '@ClearCompleted'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });
  });

  test('Clear completed button visibility toggling',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Clear Completed Items');
    await allure.story('Story: Clear completed button visibility');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given the app is empty
    await allure.step('GIVEN the app is empty', async (step) => {
      const clearButton = page.getByRole('button', { name: /Clear completed/i });
      const isVisible = await clearButton.isVisible().catch(() => false);
      expect(isVisible, 'Clear completed button should not be visible initially').toBe(false);
    });

    // 2. When I add item 'Buy milk'
    await allure.step('WHEN I add item "Buy milk"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
    });

    // 3. Then the 'Clear completed' button is still not visible
    await allure.step('THEN the "Clear completed" button is still not visible', async (step) => {
      const clearButton = page.getByRole('button', { name: /Clear completed/i });
      const isVisible = await clearButton.isVisible().catch(() => false);
      expect(isVisible, 'Clear completed button should not be visible for active items').toBe(false);
    });

    // 4. When I mark 'Buy milk' as complete
    await allure.step('WHEN I mark "Buy milk" as complete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
    });

    // 5. Then the 'Clear completed' button is now visible
    await allure.step('THEN the "Clear completed" button is now visible', async (step) => {
      const clearButton = page.getByRole('button', { name: /Clear completed/i });
      await expect(clearButton, 'Clear completed button should be visible with completed item').toBeVisible();
    });

    // 6. When I click 'Clear completed'
    await allure.step('WHEN I click "Clear completed"', async (step) => {
      const clearButton = page.getByRole('button', { name: /Clear completed/i });
      await clearButton.click();
    });

    // 7. Then the 'Clear completed' button is no longer visible
    await allure.step('THEN the "Clear completed" button is no longer visible', async (step) => {
      const clearButton = page.getByRole('button', { name: /Clear completed/i });
      const isVisible = await clearButton.isVisible().catch(() => false);
      expect(isVisible, 'Clear completed button should be hidden after clearing').toBe(false);
    });
  });
});
