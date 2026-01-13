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

  test('Add multiple todo items',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Add Todo Items');
    await allure.story('Story: Add multiple todo items');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    const items = ['Buy milk', 'Walk the dog', 'Read a book'];

    // 1. Given the list is empty
    await allure.step('GIVEN the list is empty', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'Todo list should start empty').toBe(0);
    });

    // 2-7. When I add multiple items
    for (let i = 0; i < items.length; i++) {
      await allure.step(`WHEN I add "${items[i]}" and press Enter`, async (step) => {
        step.parameter('Item', items[i]);
        const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
        await inputField.fill(items[i]);
        await inputField.press('Enter');
      });
    }

    // 8. Then all items appear in order
    await allure.step('THEN all items appear in the list in order', async (step) => {
      for (let i = 0; i < items.length; i++) {
        const itemElement = page.getByText(items[i]);
        await expect(itemElement, `Item "${items[i]}" should be visible`).toBeVisible();
      }
    });

    // 9. And the counter displays '3 items left'
    await allure.step('AND the counter displays "3 items left"', async (step) => {
      const counter = page.getByText(/3 items left/);
      await expect(counter, 'Counter should display "3 items left"').toBeVisible();
    });
  });
});
