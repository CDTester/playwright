// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Complete Todo Items', { tag: ['@Todo', '@Complete'] }, () => {
  
  test.beforeEach('Setup item and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add and complete an item
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      
      // Mark as complete
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
    });
  });

  test('Mark completed item as incomplete',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Complete Todo Items');
    await allure.story('Story: Mark completed item as incomplete');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. Given the app has item 'Buy milk' marked as complete
    await allure.step('GIVEN the app has item "Buy milk" marked as complete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await expect(checkbox, 'Item should be marked complete initially').toBeChecked();
    });

    // 2. When I click the checkbox next to 'Buy milk'
    await allure.step('WHEN I click the checkbox next to "Buy milk"', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.uncheck();
    });

    // 3. Then 'Buy milk' is marked as incomplete
    await allure.step('THEN "Buy milk" is marked as incomplete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await expect(checkbox, '"Buy milk" checkbox should be unchecked').not.toBeChecked();
    });

    // 4. And the strike-through styling is removed
    await allure.step('AND the strike-through styling is removed', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const label = buyMilkItem.locator('label');
      const classList = await label.evaluate(el => el.className);
      expect(classList, 'Incomplete item should not have completed class').not.toContain('completed');
    });

    // 5. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });
  });
});
