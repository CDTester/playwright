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

  test('Handle rapid consecutive item additions',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edge Cases and Error Handling');
    await allure.story('Story: Handle rapid additions');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given the ToDo app has loaded
    await allure.step('GIVEN the ToDo app has loaded', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await expect(inputField, 'Input should be visible').toBeVisible();
    });

    // 2. When I rapidly add 10 items in quick succession
    await allure.step('WHEN I rapidly add 10 items in quick succession', async (step) => {
      step.parameter('Item Count', 10);
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      for (let i = 1; i <= 10; i++) {
        await inputField.fill(`Rapid item ${i}`);
        await inputField.press('Enter');
      }
    });

    // 3. Then all 10 items are added in order
    await allure.step('THEN all 10 items are added in order', async (step) => {
      const todoList = page.locator('ul').first();
      const items = todoList.locator('li');
      const count = await items.count();
      expect(count, 'All 10 items should be added').toBe(10);
    });

    // 4. And the counter displays '10 items left'
    await allure.step('AND the counter displays "10 items left"', async (step) => {
      const counter = page.getByText(/10 items left/);
      await expect(counter, 'Counter should display correct count').toBeVisible();
    });

    // 5. And no items are skipped or lost
    await allure.step('AND no items are skipped or lost', async (step) => {
      for (let i = 1; i <= 10; i++) {
        const todoList = page.locator('ul').first();
        const item = todoList.locator('li').filter({ hasText: new RegExp(`^Rapid item ${i}$`) });
        await expect(item, `Item ${i} should be present`).toBeVisible();
      }
    });
  });
});
