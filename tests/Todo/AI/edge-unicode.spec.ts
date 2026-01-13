// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Edge Cases and Error Handling', { tag: ['@Todo', '@EdgeCase'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });
  });

  test('Handle items with Unicode and emoji characters',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edge Cases and Error Handling');
    await allure.story('Story: Handle Unicode and emoji');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given the ToDo app has loaded
    await allure.step('GIVEN the ToDo app has loaded', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await expect(inputField, 'Input should be visible').toBeVisible();
    });

    // 2. When I add item '🛒 Buy milk'
    await allure.step('WHEN I add item "🛒 Buy milk"', async (step) => {
      step.parameter('Item', '🛒 Buy milk');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('🛒 Buy milk');
      await inputField.press('Enter');
    });

    // 3. Then the emoji displays correctly
    await allure.step('THEN the emoji displays correctly', async (step) => {
      const emojiItem = page.getByText('🛒 Buy milk');
      await expect(emojiItem, 'Emoji item should be visible').toBeVisible();
    });

    // 4. When I add item with Chinese characters '買牛奶'
    await allure.step('WHEN I add item with Chinese characters "購牛奶"', async (step) => {
      step.parameter('Item', '購牛奶');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('購牛奶');
      await inputField.press('Enter');
    });

    // 5. Then all Unicode characters are displayed correctly
    await allure.step('THEN all Unicode characters are displayed correctly', async (step) => {
      const unicodeItem = page.getByText('購牛奶');
      await expect(unicodeItem, 'Unicode characters should be visible').toBeVisible();
    });
  });
});
