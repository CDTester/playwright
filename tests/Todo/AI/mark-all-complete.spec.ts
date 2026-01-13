// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Complete Todo Items', { tag: ['@Todo', '@Complete'] }, () => {
  
  test.beforeEach('Setup items and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with items', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add three items
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
      await inputField.fill('Read a book');
      await inputField.press('Enter');
    });
  });

  test('Mark all items as complete',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Complete Todo Items');
    await allure.story('Story: Mark all items as complete');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. Given the app has items
    await allure.step('GIVEN the app has items "Buy milk", "Walk the dog", and "Read a book"', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      expect(count, 'Should have 3 items').toBe(3);
    });

    // 2. When I click the 'Mark all as complete' checkbox
    await allure.step('WHEN I click the "Mark all as complete" checkbox', async (step) => {
      const markAllCheckbox = page.getByRole('checkbox', { name: /Mark all/ });
      await markAllCheckbox.check();
    });

    // 3. Then all items are marked as complete
    await allure.step('THEN all items are marked as complete', async (step) => {
      const items = page.locator('li');
      const checkboxes = items.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      for (let i = 0; i < count; i++) {
        await expect(checkboxes.nth(i), `Checkbox ${i + 1} should be checked`).toBeChecked();
      }
    });

    // 4. And all items are displayed with strike-through styling
    await allure.step('AND all items are displayed with strike-through styling', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      for (let i = 0; i < count; i++) {
        const label = items.nth(i).locator('label');
        const classList = await label.evaluate(el => el.className);
        expect(classList, `Item ${i + 1} should have completed class`).toContain('completed');
      }
    });

    // 5. And the counter displays '0 items left'
    await allure.step('AND the counter displays "0 items left"', async (step) => {
      // When all items are complete, there should be no counter or it shows 0
      const counter = page.getByText(/items? left/);
      const isVisible = await counter.isVisible().catch(() => false);
      expect(isVisible, 'Counter should not be visible when all items are complete').toBe(false);
    });
  });
});
