// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Edge Cases and Error Handling', { tag: ['@Todo', '@EdgeCase'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });
  });

  test('Handle very large number of items',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edge Cases and Error Handling');
    await allure.story('Story: Handle many items');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given the ToDo app has loaded
    await allure.step('GIVEN the ToDo app has loaded', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await expect(inputField, 'Input should be visible').toBeVisible();
    });

    // 2. When I add 100 todo items
    await allure.step('WHEN I add 100 todo items', async (step) => {
      step.parameter('Item Count', 100);
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      for (let i = 1; i <= 100; i++) {
        await inputField.fill(`Item ${i}`);
        await inputField.press('Enter');
      }
    });

    // 3. Then all items are visible in the list
    await allure.step('THEN all items are visible in the list', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'All items should be added').toBe(100);
    });

    // 4. And the counter displays '100 items left'
    await allure.step('AND the counter displays "100 items left"', async (step) => {
      const counter = page.getByText(/100 items left/);
      await expect(counter, 'Counter should display correct count').toBeVisible();
    });

    // 5. And the application remains responsive
    await allure.step('AND the application remains responsive', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Test item');
      const value = await inputField.inputValue();
      expect(value, 'App should respond to input').toBe('Test item');
    });
  });
});
