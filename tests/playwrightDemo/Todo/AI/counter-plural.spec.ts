// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Counter Display', { tag: ['@Todo', '@Counter'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });
  });

  test('Counter displays plural for multiple active items',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Counter Display');
    await allure.story('Story: Counter plural form');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. When I add item 'Buy milk'
    await allure.step('WHEN I add item "Buy milk"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
    });

    // 2. And I add item 'Walk the dog'
    await allure.step('AND I add item "Walk the dog"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
    });

    // 3. Then the counter text displays '2 items left' (plural)
    await allure.step('THEN the counter text displays "2 items left" (plural)', async (step) => {
      const counter = page.getByText(/2 items left/);
      const text = await counter.textContent();
      expect(text, 'Counter should use plural "items"').toContain('items left');
    });
  });
});
