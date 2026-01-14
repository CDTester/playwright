// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Keyboard Navigation and Accessibility', { tag: ['@Todo', '@Accessibility'] }, () => {
  
  test.beforeEach('Setup item and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with an item', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
    });
  });

  test('Checkboxes have proper accessibility attributes',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Keyboard Navigation and Accessibility');
    await allure.story('Story: Checkbox accessibility attributes');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the ToDo app has loaded with item 'Buy milk'
    await allure.step('GIVEN the ToDo app has loaded with item "Buy milk"', async (step) => {
      const buyMilkItem = page.getByText('Buy milk');
      await expect(buyMilkItem, 'Item should exist').toBeVisible();
    });

    // 2. Then the checkbox has accessible label 'Toggle Todo'
    await allure.step('THEN the checkbox has accessible label', async (step) => {
      const checkbox = page.getByRole('checkbox', { name: /Toggle/ });
      await expect(checkbox, 'Checkbox should have accessible name').toBeTruthy();
    });

    // 3. When I use keyboard to navigate to the checkbox
    await allure.step('WHEN I use keyboard to navigate to the checkbox', async (step) => {
      const checkbox = page.getByRole('checkbox').first();
      await checkbox.focus();
    });

    // 4. And I press Space to toggle it
    await allure.step('AND I press Space to toggle it', async (step) => {
      await page.keyboard.press('Space');
    });

    // 5. Then the checkbox state changes
    await allure.step('THEN the checkbox state changes', async (step) => {
      const checkbox = page.getByRole('checkbox').first();
      const isChecked = await checkbox.isChecked();
      expect(isChecked, 'Checkbox state should change').toBe(true);
    });

    // 6. And the state is properly indicated
    await allure.step('AND the state is properly indicated', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      const classList = await buyMilkItem.evaluate(el => el.className);
      expect(classList, 'Completed class should be added').toContain('completed');
    });
  });
});
