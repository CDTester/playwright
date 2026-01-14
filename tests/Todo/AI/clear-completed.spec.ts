// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Clear Completed Items', { tag: ['@Todo', '@ClearCompleted'] }, () => {
  
  test.beforeEach('Setup items with mixed completion and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with items', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      // Remove all existing todos robustly - target only todo list items, not filter items
      const todoList = page.locator('ul').first();
      while (await todoList.locator('li').count() > 0) {
        // Try to click all destroy/delete buttons
        const items = todoList.locator('li');
        const count = await items.count();
        for (let i = 0; i < count; i++) {
          const destroyBtn = items.nth(0).locator('button, .destroy, .delete');
          if (await destroyBtn.count()) {
            await destroyBtn.click({ force: true }).catch(() => {});
          } else {
            // fallback: double-click to edit and then clear
            await items.nth(0).dblclick().catch(() => {});
          }
        }
      }
      // Confirm list is empty
      await expect(todoList.locator('li')).toHaveCount(0);
      // Add three items
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
      await inputField.fill('Read a book');
      await inputField.press('Enter');
      // Mark first and third items as complete
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const buyMilkCheckbox = buyMilkItem.locator('input[type="checkbox"]');
      await buyMilkCheckbox.check();
      const readBookItem = page.locator('li').filter({ hasText: 'Read a book' });
      const readBookCheckbox = readBookItem.locator('input[type="checkbox"]');
      await readBookCheckbox.check();
    });
  });

  test('Clear all completed items',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Clear Completed Items');
    await allure.story('Story: Clear all completed items');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given items with some marked as complete
    await allure.step('GIVEN items with "Buy milk" and "Read a book" marked as complete', async (step) => {
      const todoList = page.locator('ul').first();
      const items = todoList.locator('li');
      const count = await items.count();
      expect(count, 'Should have 3 items').toBe(3);
    });

    // 2. When I click the 'Clear completed' button
    await allure.step('WHEN I click the "Clear completed" button', async (step) => {
      const clearButton = page.getByRole('button', { name: /Clear completed/i });
      await clearButton.click();
    });

    // 3. Then all completed items are removed
    await allure.step('THEN all completed items are removed', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const readBookItem = page.locator('li').filter({ hasText: 'Read a book' });
      await expect(buyMilkItem, 'Buy milk should be removed').toHaveCount(0);
      await expect(readBookItem, 'Read a book should be removed').toHaveCount(0);
    });

    // 4. And only 'Walk the dog' remains
    await allure.step('AND only "Walk the dog" remains', async (step) => {
      const walkDogItem = page.locator('li').filter({ hasText: 'Walk the dog' });
      await expect(walkDogItem, 'Walk the dog should remain').toBeVisible();
    });

    // 5. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });

    // 6. And the 'Clear completed' button is no longer visible
    await allure.step('AND the "Clear completed" button is no longer visible', async (step) => {
      const clearButton = page.getByRole('button', { name: /Clear completed/i });
      const isVisible = await clearButton.isVisible().catch(() => false);
      expect(isVisible, 'Clear completed button should be hidden').toBe(false);
    });
  });
});
