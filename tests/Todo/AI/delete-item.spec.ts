// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Delete Todo Items', { tag: ['@Todo', '@Delete'] }, () => {
  
  test.beforeEach('Setup items and navigate to ToDo app', async ({ page }) => {
    await allure.step('GIVEN the app has loaded with items', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      
      // Add two items
      const inputField = page.getByRole('textbox', { name: 'What needs to be done?' });
      await inputField.fill('Buy milk');
      await inputField.press('Enter');
      await inputField.fill('Walk the dog');
      await inputField.press('Enter');
    });
  });

  test('Delete a todo item',
    { tag: ['@smoke'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Delete Todo Items');
    await allure.story('Story: Delete a single todo item');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.HIGH);

    // 1. Given the app has items 'Buy milk' and 'Walk the dog'
    await allure.step('GIVEN the app has items "Buy milk" and "Walk the dog"', async (step) => {
      const todoList = page.locator('ul').first();
      const items = todoList.locator('li');
      const count = await items.count();
      expect(count, 'Should have 2 items').toBe(2);
    });

    // 2. When I hover over 'Buy milk'
    await allure.step('WHEN I hover over "Buy milk"', async (step) => {
      const buyMilkItem = page.locator('li').filter({ hasText: 'Buy milk' });
      await buyMilkItem.hover();
    });

    // 3. And I click the delete button (×) for 'Buy milk'
    await allure.step('AND I click the delete button (×) for "Buy milk"', async (step) => {
      const todoList = page.locator('ul').first();
      const buyMilkItem = todoList.locator('li').filter({ hasText: 'Buy milk' });
      const deleteButton = buyMilkItem.locator('button');
      await deleteButton.click();
    });

    // 4. Then 'Buy milk' is removed from the list
    await allure.step('THEN "Buy milk" is removed from the list', async (step) => {
      const todoList = page.locator('ul').first();
      const buyMilkItem = todoList.locator('li').filter({ hasText: 'Buy milk' });
      await expect(buyMilkItem, '"Buy milk" should not be visible').toHaveCount(0);
    });

    // 5. And 'Walk the dog' is still in the list
    await allure.step('AND "Walk the dog" is still in the list', async (step) => {
      const todoList = page.locator('ul').first();
      const walkDogItem = todoList.locator('li').filter({ hasText: 'Walk the dog' });
      await expect(walkDogItem, '"Walk the dog" should still be visible').toBeVisible();
    });

    // 6. And the counter displays '1 item left'
    await allure.step('AND the counter displays "1 item left"', async (step) => {
      const counter = page.getByText(/1 item left/);
      await expect(counter, 'Counter should display "1 item left"').toBeVisible();
    });
  });
});
