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

  test('Counter correctly tracks active items',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Counter Display');
    await allure.story('Story: Counter correctly tracks active items');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.BLOCKER);

    // 1. Then the counter displays '0 items left'
    await allure.step('THEN the counter displays "0 items left" initially', async (step) => {
      const counter = page.getByText(/items? left/);
      const isVisible = await counter.isVisible().catch(() => false);
      expect(isVisible, 'Counter should not be visible for empty list').toBe(false);
    });

    // 2. When I add item 'Buy milk'
    await allure.step('WHEN I add item "Buy milk"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
    });

    // 3. Then the counter displays '1 item left'
    await allure.step('THEN the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });

    // 4. When I add item 'Walk the dog'
    await allure.step('WHEN I add item "Walk the dog"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
    });

    // 5. Then the counter displays '2 items left'
    await allure.step('THEN the counter displays "2 items left"', async (step) => {
      const counter = page.getByText(/2 items left/);
      await expect(counter, 'Counter should display "2 items left"').toBeVisible();
    });

    // 6. When I mark 'Buy milk' as complete
    await allure.step('WHEN I mark "Buy milk" as complete', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
    });

    // 7. Then the counter displays '1 item left'
    await allure.step('THEN the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should update to "1 item left"').toBeVisible();
    });
  });
});
