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

  test('Counter displays singular for one active item',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Counter Display');
    await allure.story('Story: Counter singular form');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. When I add one item 'Buy milk'
    await allure.step('WHEN I add one item "Buy milk"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
    });

    // 2. Then the counter text displays '1 item left' (singular)
    await allure.step('THEN the counter text displays "1 item left" (singular)', async (step) => {
      const counter = page.getByText(/1 item left/);
      const text = await counter.textContent();
      expect(text, 'Counter should use singular "item"').toContain('item left');
      expect(text, 'Counter should not contain "items"').not.toMatch(/items left/);
    });
  });
});
