// spec: specs/Todo_Plan.md
// seed: tests/Todo/AI/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('User Interface and Navigation', { tag: ['@Todo', '@UI'] }, () => {
  
  test('Footer displays helpful information',
    { tag: ['@regression'] },
    async ({ page }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: User Interface and Navigation');
    await allure.story('Story: Footer information display');
    await allure.owner('QA Team');
    await allure.severity(allure.Severity.LOW);

    // 1. Given I navigate to the ToDo app
    await allure.step('GIVEN I navigate to the ToDo app', async (step) => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
    });


    // 2. Then the footer displays 'Double-click to edit a todo'
    await allure.step('THEN the footer displays "Double-click to edit a todo"', async () => {
      // The footer is expected to contain this text
      const doubleClickText = page.getByText('Double-click to edit a todo', { exact: false });
      await expect(doubleClickText, 'Footer should contain edit instruction').toBeVisible();
    });


    // 3. And the footer displays creator information
    await allure.step('AND the footer displays creator information', async () => {
      const createdByText = page.getByText('Created by', { exact: false });
      await expect(createdByText, 'Footer should display creator information').toBeVisible();
    });

    // 4. And the footer contains a link to TodoMVC
    await allure.step('AND the footer contains a link to TodoMVC', async () => {
      // There are two links with 'TodoMVC' in the name, but only one is exactly 'TodoMVC' (the footer link)
      const todoMvcLink = page.getByRole('link', { name: 'TodoMVC', exact: true });
      await expect(todoMvcLink, 'Footer should contain link to TodoMVC').toBeVisible();
    });
  });
});
