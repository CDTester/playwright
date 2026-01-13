// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Keyboard Navigation and Accessibility', { tag: ['@Todo', '@Accessibility'] }, () => {
  
  test('Add item using keyboard only',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Keyboard Navigation and Accessibility');
    await allure.story('Story: Add item using keyboard only');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the ToDo app has loaded and the input field is focused
    await allure.step('GIVEN the ToDo app has loaded and the input field is focused', async (step) => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await expect(inputField, 'Input should be focused').toBeFocused();
    });

    // 2. When I type 'Buy milk' without using the mouse
    await allure.step('WHEN I type "Buy milk" without using the mouse', async (step) => {
      await page.keyboard.type('Buy milk');
    });

    // 3. And I press Enter
    await allure.step('AND I press Enter', async (step) => {
      await page.keyboard.press('Enter');
    });

    // 4. Then the item is added to the list
    await allure.step('THEN the item is added to the list', async (step) => {
      const buyMilkItem = page.getByText('Buy milk');
      await expect(buyMilkItem, 'Item should be added').toBeVisible();
    });

    // 5. And focus returns to the input field
    await allure.step('AND focus returns to the input field', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await expect(inputField, 'Focus should return to input').toBeFocused();
    });

    // 6. And I can immediately type another item
    await allure.step('AND I can immediately type another item', async (step) => {
      await page.keyboard.type('Walk the dog');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      const value = await inputField.inputValue();
      expect(value, 'Should be able to type next item').toBe('Walk the dog');
    });
  });
});
