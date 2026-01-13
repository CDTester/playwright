// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Delete Todo Items', { tag: ['@Todo', '@Delete'] }, () => {
  
  test.beforeEach('Setup completed item and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with a completed item', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add an item and mark it as complete
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      
      // Mark as complete
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
    });
  });

  test('Delete a completed item',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Delete Todo Items');
    await allure.story('Story: Delete a completed todo item');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the app has item 'Buy milk' marked as complete
    await allure.step('GIVEN the app has item "Buy milk" marked as complete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await expect(checkbox, 'Item should be marked complete').toBeChecked();
    });

    // 2. When I click the delete button (×) for 'Buy milk'
    await allure.step('WHEN I click the delete button (×) for "Buy milk"', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      await buyMilkItem.hover();
      const deleteButton = buyMilkItem.locator('button');
      await deleteButton.click();
    });

    // 3. Then 'Buy milk' is removed from the list
    await allure.step('THEN "Buy milk" is removed from the list', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      await expect(buyMilkItem, '"Buy milk" should be deleted').toHaveCount(0);
    });

    // 4. And the counter displays '0 items left'
    await allure.step('AND the counter displays "0 items left"', async (step) => {
      const counter = page.getByText(/items? left/);
      const isVisible = await counter.isVisible().catch(() => false);
      expect(isVisible, 'Counter should not be visible when no items remain').toBe(false);
    });
  });
});
