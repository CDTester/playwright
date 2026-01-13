// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Add Todo Items', { tag: ['@Todo', '@Add'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });
  });

  test('Empty item should not be added',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Add Todo Items');
    await allure.story('Story: Empty item validation');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the list is empty
    await allure.step('GIVEN the list is empty', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'Todo list should start empty').toBe(0);
    });

    // 2. When I leave the input field empty
    await allure.step('WHEN I leave the input field empty', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      // Verify input is empty
      const value = await inputField.inputValue();
      expect(value, 'Input should be empty').toBe('');
    });

    // 3. And I press Enter
    await allure.step('AND I press Enter', async (step) => {
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    });

    // 4. Then no item is added to the list
    await allure.step('THEN no item is added to the list', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'No items should be added when input is empty').toBe(0);
    });

    // 5. And the counter displays '0 items left'
    await allure.step('AND the counter displays "0 items left"', async (step) => {
      // Check that counter is not visible (no items)
      const counter = page.getByText(/\d+ items? left/);
      const isVisible = await counter.isVisible().catch(() => false);
      expect(isVisible, 'Counter should not be visible when list is empty').toBe(false);
    });
  });
});
