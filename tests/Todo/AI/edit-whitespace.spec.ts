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

  test('Whitespace is trimmed when editing item',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edit Todo Items');
    await allure.story('Story: Whitespace trimming on edit');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.MEDIUM);

    // 1. Given the app has item 'Buy milk'
    await allure.step('GIVEN the app has item "Buy milk"', async (step) => {
      const todoList = page.locator('ul').first();
      const buyMilkItem = todoList.locator('li').filter({ hasText: 'Buy milk' });
      await expect(buyMilkItem, 'Item "Buy milk" should exist').toBeVisible();
    });

    // 2. When I double-click on 'Buy milk' to enter edit mode
    await allure.step('WHEN I double-click on "Buy milk" to enter edit mode', async (step) => {
      const todoList = page.locator('ul').first();
      const buyMilkItem = todoList.locator('li').filter({ hasText: 'Buy milk' });
      const label = buyMilkItem.locator('label');
      await label.dblclick();
    });

    // 3. And I enter '  Buy cheese  ' with leading and trailing spaces
    await allure.step('AND I enter "  Buy cheese  " with leading and trailing spaces', async (step) => {
      const editInput = page.locator('input.edit');
      await editInput.fill('  Buy cheese  ');
    });

    // 4. And I press Enter to save
    await allure.step('AND I press Enter to save', async (step) => {
      const editInput = page.locator('input.edit');
      await editInput.press('Enter');
    });

    // 5. Then the item displays 'Buy cheese' without extra spaces
    await allure.step('THEN the item displays "Buy cheese" without extra spaces', async (step) => {
      const todoList = page.locator('ul').first();
      const buyCheese = todoList.locator('li').filter({ hasText: /^Buy cheese$/ });
      await expect(buyCheese, 'Item should display without extra spaces').toBeVisible();
    });

    // 6. And the item is saved successfully
    await allure.step('AND the item is saved successfully', async (step) => {
      const todoList = page.locator('ul').first();
      const items = todoList.locator('li');
      const count = await items.count();
      expect(count, 'Item should be saved and present').toBe(1);
    });
  });
});
