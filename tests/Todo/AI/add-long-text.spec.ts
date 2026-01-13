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

  test('Add item with very long text',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Add Todo Items');
    await allure.story('Story: Add item with long text');
    await allure.owner('QA Team');
    // await allure.severity(allure.Severity.MEDIUM);
    await allure.severity(allure.Severity.NORMAL);

    const longText = 'This is a very long todo item with more than 100 characters to test that the application can handle extended text inputs without any truncation or display issues whatsoever';

    // 1. Given the list is empty
    await allure.step('GIVEN the list is empty', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'Todo list should start empty').toBe(0);
    });

    // 2. When I enter a long text item (100+ characters)
    await allure.step('WHEN I enter a long text item (100+ characters)', async (step) => {
      // step.parameter('Text Length', longText.length);
      step.parameter('Text Length', longText.length.toString());
      step.parameter('Item Text', longText.substring(0, 50) + '...');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill(longText);
      await inputField.press('Enter');
    });

    // 3. Then the long item is added and fully displayed
    await allure.step('THEN the long item is added and fully displayed', async (step) => {
      const itemElement = page.getByText(longText);
      await expect(itemElement, 'Long text item should be visible in the list').toBeVisible();
    });

    // 4. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });
  });
});
