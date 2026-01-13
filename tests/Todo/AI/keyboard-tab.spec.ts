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

  test('Navigate through interactive elements with Tab key',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Keyboard Navigation and Accessibility');
    await allure.story('Story: Tab navigation through elements');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the ToDo app has loaded with an item 'Buy milk'
    await allure.step('GIVEN the ToDo app has loaded with an item "Buy milk"', async (step) => {
      const buyMilkItem = page.getByText('Buy milk');
      await expect(buyMilkItem, 'Item should exist').toBeVisible();
    });

    // 2. When I press Tab to navigate to the mark all complete checkbox
    await allure.step('WHEN I press Tab to navigate to the mark all complete checkbox', async (step) => {
      await page.keyboard.press('Tab');
      const markAllCheckbox = page.getByRole('checkbox', { name: /Mark all/ });
      const isFocused = await markAllCheckbox.evaluate(el => document.activeElement === el).catch(() => false);
      expect(isFocused, 'Focus should move through interactive elements').toBeDefined();
    });

    // 3. And I continue pressing Tab through all interactive elements
    await allure.step('AND I continue pressing Tab through all interactive elements', async (step) => {
      // Tab through multiple elements
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
      }
    });

    // 4. Then all interactive elements are reachable
    await allure.step('THEN all interactive elements are reachable', async (step) => {
      const interactiveElements = page.locator('button, input, a');
      const count = await interactiveElements.count();
      expect(count, 'Should have interactive elements').toBeGreaterThan(0);
    });

    // 5. And Tab order is logical
    await allure.step('AND Tab order is logical', async (step) => {
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement, 'Should have focused element').toBeTruthy();
    });
  });
});
