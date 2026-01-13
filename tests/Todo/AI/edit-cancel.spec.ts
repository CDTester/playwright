// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Edit Todo Items', { tag: ['@Todo', '@Edit'] }, () => {
  
  test.beforeEach('Setup item and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with an item', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add an item
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
    });
  });

  test('Cancel edit with Escape key',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edit Todo Items');
    await allure.story('Story: Cancel edit with Escape key');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the app has item 'Buy milk'
    await allure.step('GIVEN the app has item "Buy milk"', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      await expect(buyMilkItem, 'Item "Buy milk" should exist').toBeVisible();
    });

    // 2. When I double-click on 'Buy milk' to enter edit mode
    await allure.step('WHEN I double-click on "Buy milk" to enter edit mode', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const label = buyMilkItem.locator('label');
      await label.dblclick();
    });

    // 3. And I type different text 'Buy cheese'
    await allure.step('AND I type different text "Buy cheese"', async (step) => {
      const editInput = page.locator('input.edit');
      await editInput.fill('Buy cheese');
    });

    // 4. And I press Escape key
    await allure.step('AND I press Escape key', async (step) => {
      const editInput = page.locator('input.edit');
      await editInput.press('Escape');
    });

    // 5. Then edit mode is cancelled
    await allure.step('THEN edit mode is cancelled', async (step) => {
      const editInput = page.locator('input.edit');
      const isVisible = await editInput.isVisible().catch(() => false);
      expect(isVisible, 'Edit input should be hidden after Escape').toBe(false);
    });

    // 6. And the item still displays 'Buy milk'
    await allure.step('AND the item still displays "Buy milk"', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      await expect(buyMilkItem, 'Original text "Buy milk" should be preserved').toBeVisible();
    });

    // 7. And no changes are saved
    await allure.step('AND no changes are saved', async (step) => {
      const buyCheese = page.locator('li').filter({ hasText: 'Buy cheese' });
      await expect(buyCheese, 'Changed text should not be saved').toHaveCount(0);
    });
  });
});
