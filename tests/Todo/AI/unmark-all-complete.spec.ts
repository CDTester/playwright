// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Complete Todo Items', { tag: ['@Todo', '@Complete'] }, () => {
  
  test.beforeEach('Setup items and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with completed items', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add three items and mark all as complete
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
      await inputField.fill('Read a book');
      await inputField.press('Enter');
      
      // Mark all as complete
      const markAllCheckbox = page.getByRole('checkbox', { name: /Mark all/ });
      await markAllCheckbox.check();
    });
  });

  test('Unmark all items when all are complete',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Complete Todo Items');
    await allure.story('Story: Unmark all items when complete');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. Given all items are marked as complete
    await allure.step('GIVEN all items are marked as complete', async (step) => {
      const todoList = page.locator('ul').first();
      const items = todoList.locator('li');
      const checkboxes = items.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      for (let i = 0; i < count; i++) {
        await expect(checkboxes.nth(i), `All checkboxes should be checked`).toBeChecked();
      }
    });

    // 2. When I click the 'Mark all as complete' checkbox
    await allure.step('WHEN I click the "Mark all as complete" checkbox', async (step) => {
      const markAllCheckbox = page.getByRole('checkbox', { name: /Mark all/ });
      await markAllCheckbox.uncheck();
    });

    // 3. Then all items are marked as incomplete
    await allure.step('THEN all items are marked as incomplete', async (step) => {
      const todoList = page.locator('ul').first();
      const items = todoList.locator('li');
      const checkboxes = items.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      for (let i = 0; i < count; i++) {
        await expect(checkboxes.nth(i), `Checkbox ${i + 1} should be unchecked`).not.toBeChecked();
      }
    });

    // 4. And the strike-through styling is removed from all items
    await allure.step('AND the strike-through styling is removed from all items', async (step) => {
      const todoList = page.locator('ul').first();
      const items = todoList.locator('li');
      const count = await items.count();
      for (let i = 0; i < count; i++) {
        const liElement = items.nth(i);
        const classList = await liElement.evaluate(el => el.className);
        expect(classList, `Item ${i + 1} should not have completed class`).not.toContain('completed');
      }
    });

    // 5. And the counter displays '3 items left'
    await allure.step('AND the counter displays "3 items left"', async (step) => {
      const counter = page.getByText(/3 items left/);
      await expect(counter, 'Counter should display "3 items left"').toBeVisible();
    });
  });
});
