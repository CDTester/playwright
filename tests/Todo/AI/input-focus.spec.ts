// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('User Interface and Navigation', { tag: ['@Todo', '@UI'] }, () => {
  
  test('Input field is focused on page load',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: User Interface and Navigation');
    await allure.story('Story: Input field focus on load');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given I navigate to the ToDo app
    await allure.step('GIVEN I navigate to the ToDo app', async (step) => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });

    // 2. Then the input field 'What needs to be done?' is focused
    await allure.step('THEN the input field "What needs to be done?" is focused', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('placeholder'));
      expect(focusedElement, 'Input field should be focused').toBe('What needs to be done?');
    });

    // 3. And I can start typing without clicking
    await allure.step('AND I can start typing without clicking', async (step) => {
      await page.keyboard.type('Test typing');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      const value = await inputField.inputValue();
      expect(value, 'Should be able to type without clicking').toBe('Test typing');
    });
  });
});
