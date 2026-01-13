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

  test('Edit todo item and save via blur',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edit Todo Items');
    await allure.story('Story: Edit and save via blur');
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

    // 3. And I clear the text and type 'Buy eggs'
    await allure.step('AND I clear the text and type "Buy eggs"', async (step) => {
      const editInput = page.locator('input.edit');
      await editInput.fill('Buy eggs');
    });

    // 4. And I click outside the input field to blur it
    await allure.step('AND I click outside the input field to blur it', async (step) => {
      const heading = page.locator('h1');
      await heading.click();
    });

    // 5. Then the item is updated to 'Buy eggs'
    await allure.step('THEN the item is updated to "Buy eggs"', async (step) => {
      const buyEggs = page.locator('li').filter({ hasText: 'Buy eggs' });
      await expect(buyEggs, 'Item should be updated to "Buy eggs"').toBeVisible();
    });

    // 6. And edit mode is exited
    await allure.step('AND edit mode is exited', async (step) => {
      const editInput = page.locator('input.edit');
      const isVisible = await editInput.isVisible().catch(() => false);
      expect(isVisible, 'Edit input should not be visible after blur').toBe(false);
    });

    // 7. And the updated item is visible in the list
    await allure.step('AND the updated item is visible in the list', async (step) => {
      const buyEggs = page.getByText('Buy eggs');
      await expect(buyEggs, 'Updated item should remain visible').toBeVisible();
    });
  });
});
