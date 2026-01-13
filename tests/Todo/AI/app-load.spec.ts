// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('User Interface and Navigation', { tag: ['@Todo', '@UI'] }, () => {
  
  test('App loads with correct title and heading',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: User Interface and Navigation');
    await allure.story('Story: App loads with correct title and heading');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. Given I navigate to https://demo.playwright.dev/todomvc/#/
    await allure.step('GIVEN I navigate to https://demo.playwright.dev/todomvc/#/', async (step) => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });

    // 2. Then the page title is 'React • TodoMVC'
    await allure.step('THEN the page title is "React • TodoMVC"', async (step) => {
      const title = await page.title();
      expect(title, 'Page title should be "React • TodoMVC"').toBe('React • TodoMVC');
    });

    // 3. And the main heading displays 'todos'
    await allure.step('AND the main heading displays "todos"', async (step) => {
      const heading = page.locator('h1');
      const text = await heading.textContent();
      expect(text, 'Main heading should display "todos"').toBe('todos');
    });

    // 4. And the input field placeholder reads 'What needs to be done?'
    await allure.step('AND the input field placeholder reads "What needs to be done?"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      const placeholder = await inputField.getAttribute('placeholder');
      expect(placeholder, 'Input placeholder should be "What needs to be done?"').toBe('What needs to be done?');
    });
  });
});
