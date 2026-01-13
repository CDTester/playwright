// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Persistence and LocalStorage', { tag: ['@Todo', '@Persistence'] }, () => {
  
  test.beforeEach('Navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });
  });

  test('Empty list persists after page reload',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Persistence and LocalStorage');
    await allure.story('Story: Empty list persistence');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. When I reload the page
    await allure.step('WHEN I reload the page', async (step) => {
      await page.reload();
    });

    // 2. Then the list remains empty
    await allure.step('THEN the list remains empty', async (step) => {
      const todoItems = page.locator('li');
      const count = await todoItems.count();
      expect(count, 'List should be empty').toBe(0);
    });

    // 3. And the counter displays '0 items left'
    await allure.step('AND the counter displays "0 items left"', async (step) => {
      const counter = page.getByText(/items? left/);
      const isVisible = await counter.isVisible().catch(() => false);
      expect(isVisible, 'Counter should not be visible for empty list').toBe(false);
    });
  });
});
