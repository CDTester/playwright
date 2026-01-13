// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Filter Todo Items', { tag: ['@Todo', '@Filter'] }, () => {
  
  test.beforeEach('Setup items with mixed states and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with mixed items', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add three items
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
      await inputField.fill('Read a book');
      await inputField.press('Enter');
      
      // Mark first item as complete
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const checkbox = buyMilkItem.locator('input[type="checkbox"]');
      await checkbox.check();
    });
  });

  test('Filter to show only active items',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Filter Todo Items');
    await allure.story('Story: Filter to show only active items');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given items with mixed completion states
    await allure.step('GIVEN items with mixed completion states', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      expect(count, 'Should have 3 items initially').toBe(3);
    });

    // 2. When I click the 'Active' filter
    await allure.step('WHEN I click the "Active" filter', async (step) => {
      const activeLink = page.getByRole('link', { name: 'Active' });
      await activeLink.click();
    });

    // 3. Then only active items are displayed
    await allure.step('THEN only active items ("Walk the dog" and "Read a book") are displayed', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      expect(count, 'Active filter should show 2 items').toBe(2);
    });

    // 4. And completed items are not visible
    await allure.step('AND completed items are not visible', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      await expect(buyMilkItem, 'Buy milk should not be visible in Active filter').toHaveCount(0);
    });

    // 5. And the 'Active' filter link is highlighted
    await allure.step('AND the "Active" filter link is highlighted', async (step) => {
      const activeLink = page.getByRole('link', { name: 'Active' });
      const className = await activeLink.evaluate(el => el.className);
      expect(className, 'Active link should have selected class').toContain('selected');
    });
  });
});
