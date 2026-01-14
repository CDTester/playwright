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

  test('Whitespace-only item should not be added',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Add Todo Items');
    await allure.story('Story: Whitespace validation');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the list is empty
    await allure.step('GIVEN the list is empty', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'Todo list should start empty').toBe(0);
    });

    // 2. When I enter only whitespace characters
    await allure.step('WHEN I enter only whitespace characters', async (step) => {
      step.parameter('Input', '   ');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('   ');
    });

    // 3. And I press Enter
    await allure.step('AND I press Enter', async (step) => {
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    });

    // 4. Then no item is added to the list
    await allure.step('THEN no item is added to the list', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'No items should be added when input is whitespace only').toBe(0);
    });

    // 5. And the input field is cleared
    await allure.step('AND the input field is cleared', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      const value = await inputField.inputValue();
      expect(value.trim(), 'Input field should be cleared after whitespace submission').toBe('');
    });
  });
});
