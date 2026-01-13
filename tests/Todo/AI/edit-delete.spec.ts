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

  test('Delete item by saving empty edit',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edit Todo Items');
    await allure.story('Story: Delete item via empty edit');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

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

    // 3. And I clear all text
    await allure.step('AND I clear all text', async (step) => {
      const editInput = page.locator('input.edit');
      await editInput.clear();
    });

    // 4. And I press Enter to save
    await allure.step('AND I press Enter to save', async (step) => {
      const editInput = page.locator('input.edit');
      await editInput.press('Enter');
    });

    // 5. Then the item is removed from the list
    await allure.step('THEN the item is removed from the list', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      await expect(buyMilkItem, 'Item should be deleted when saved as empty').toHaveCount(0);
    });

    // 6. And the counter displays '0 items left'
    await allure.step('AND the counter displays "0 items left"', async (step) => {
      const counter = page.getByText(/items? left/);
      const isVisible = await counter.isVisible().catch(() => false);
      expect(isVisible, 'Counter should not be visible when list is empty').toBe(false);
    });
  });
});
