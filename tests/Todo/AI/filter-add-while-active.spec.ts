// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Filter Todo Items', { tag: ['@Todo', '@Filter'] }, () => {
  
  test.beforeEach('Setup items and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with items', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add two items
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
      
      // Mark first item as complete
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
      
      // Navigate to Active filter
      const activeLink = page.getByRole('link', { name: 'Active' });
      await activeLink.click();
    });
  });

  test('Add item while on Active filter view',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Filter Todo Items');
    await allure.story('Story: Add item while on Active filter');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given items with one active and one completed
    await allure.step('GIVEN the Active filter is displayed with 1 active item', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      expect(count, 'Active filter should show 1 item').toBe(1);
    });

    // 2. When I add new item 'Read a book'
    await allure.step('WHEN I add new item "Read a book"', async (step) => {
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Read a book');
      await inputField.press('Enter');
    });

    // 3. Then the new item is immediately visible in the filtered list
    await allure.step('THEN the new item is immediately visible in the filtered list', async (step) => {
      const readBookItem = page.locator('li').filter({ hasText: 'Read a book' });
      await expect(readBookItem, 'New item should be visible in Active filter').toBeVisible();
    });

    // 4. And other active items are still visible
    await allure.step('AND other active items are still visible', async (step) => {
      const walkDogItem = page.locator('li').filter({ hasText: 'Walk the dog' });
      await expect(walkDogItem, 'Walk the dog should still be visible').toBeVisible();
    });
  });
});
