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

  test('Add item with special characters',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Add Todo Items');
    await allure.story('Story: Add item with special characters');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given the list is empty
    await allure.step('GIVEN the list is empty', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'Todo list should start empty').toBe(0);
    });

    // 2. When I enter 'Buy milk @$#%!' with special characters
    await allure.step('WHEN I enter "Buy milk @$#%!" with special characters', async (step) => {
      step.parameter('Item Text', 'Buy milk @$#%!');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk @$#%!');
      await inputField.press('Enter');
    });

    // 3. Then the item appears with special characters preserved
    await allure.step('THEN the item appears with special characters preserved', async (step) => {
      const itemElement = page.getByText('Buy milk @$#%!');
      await expect(itemElement, 'Item should contain special characters exactly as entered').toBeVisible();
    });

    // 4. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });
  });
});
