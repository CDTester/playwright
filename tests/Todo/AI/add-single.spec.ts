// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Add Todo Items', { tag: ['@Todo', '@Add'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      const title = await page.title();
      expect(title, 'Page title should be "React • TodoMVC"').toBe('React • TodoMVC');
    });
  });

  test('Add a single todo item', 
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Add Todo Items');
    await allure.story('Story: Add a single todo item');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. Given the list is empty
    await allure.step('GIVEN the list is empty', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      step.parameter('Initial Item Count', count);
      expect(count, 'Todo list should start empty').toBe(0);
    });

    // 2. When I enter 'Buy milk' in the input field
    await allure.step('WHEN I enter "Buy milk" in the input field', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      step.parameter('Item Text', 'Buy milk');
      await inputField.fill('Buy milk');
    });

    // 3. And I press Enter to submit
    await allure.step('AND I press Enter to submit the item', async (step) => {
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    });

    // 4. Then the item 'Buy milk' appears in the list
    await allure.step('THEN the item "Buy milk" appears in the list', async (step) => {
      const todoItem = page.getByText('Buy milk');
      await expect(todoItem, 'The item "Buy milk" should be visible in the list').toBeVisible();
    });

    // 5. And the input field is cleared
    await allure.step('AND the input field is cleared', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      const value = await inputField.inputValue();
      expect(value, 'Input field should be empty after adding item').toBe('');
    });

    // 6. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });
  });
});
