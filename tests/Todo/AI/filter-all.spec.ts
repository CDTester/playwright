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

  test('Filter to show all items',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Filter Todo Items');
    await allure.story('Story: Filter to show all items');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given items with mixed completion states
    await allure.step('GIVEN items with mixed completion states', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      expect(count, 'Should have 3 items').toBe(3);
    });

    // 2. When I click the 'All' filter
    await allure.step('WHEN I click the "All" filter', async (step) => {
      const allLink = page.getByRole('link', { name: 'All' });
      await allLink.click();
    });

    // 3. Then all items (active and completed) are displayed
    await allure.step('THEN all items (active and completed) are displayed', async (step) => {
      const items = page.locator('li');
      const count = await items.count();
      expect(count, 'All filter should show all 3 items').toBe(3);
    });

    // 4. And the 'All' filter link is highlighted
    await allure.step('AND the "All" filter link is highlighted', async (step) => {
      const allLink = page.getByRole('link', { name: 'All' });
      const className = await allLink.evaluate(el => el.className);
      expect(className, 'All link should have selected class').toContain('selected');
    });
  });
});
