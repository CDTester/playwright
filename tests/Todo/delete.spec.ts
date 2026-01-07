import { test, expect } from '../../fixtures/todoFixture';
import type { Locator } from '@playwright/test';
import * as allure from "allure-js-commons";

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];


test.describe('Delete Todo', {tag: ['@Todo', '@Delete']}, () => {

  test.beforeEach('Navigate to ToDoMVC App', async ({ todoPage }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Delete ToDo Items');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${todoPage.url} has loaded`, async ()  => {
      await todoPage.goto();
      await expect(todoPage.page, `Expexted page title to be '${todoPage.pageTitle}' >> `).toHaveTitle(todoPage.pageTitle);
      await expect(todoPage.header1, `Expected heading to be '${todoPage.header1Text}' >> `).toHaveText(todoPage.header1Text);
    });
  });

  test('The delete button should be visible when hovering over an item', {tag: ['@smoke']}, async ({ todoPage }) => {
    await allure.story('Story: Delete ToDo Items from the list');
    await allure.tms('TODO-141');
    await allure.issue('BUG-141');
    await allure.severity(allure.Severity.BLOCKER);

    let item: Locator;
    let deleteButton: Locator;

    await allure.step('GIVEN the todo list already has 1 item', async (step) => {
      await todoPage.addToDo(TODO_ITEMS[0]);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 1 >> `).toHaveCount(1);
    });
    await allure.step('AND the delete button is not visible', async () => {
      item = await todoPage.todoItems.first();
      deleteButton = item.locator('button.destroy');
      expect(deleteButton, `Expected delete button to be not visible >> `).not.toBeVisible();
    });
    await allure.step('WHEN an item is hovered over', async () => {
      await item.hover();
    });
    await allure.step('THEN the delete button is visible', async () => {
      await expect(deleteButton, `Expected delete button to be visible >> `).toBeVisible();
    });
  });


  test('An item can be removed from using the delete button', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Delete ToDo Items from the list');
    await allure.tms('TODO-142');
    await allure.issue('BUG-142');
    await allure.severity(allure.Severity.CRITICAL);

    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
    await allure.step('WHEN the delete button clicked on the first item', async () => {
      await todoPage.remove(TODO_ITEMS[0]);
    });
    await allure.step('THEN the first item is removed from the list', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 2 >> `).toHaveCount(2);
      await expect(todoPage.todoItems, `Expected todo items to have text [${TODO_ITEMS[1]}, ${TODO_ITEMS[2]}] >> `).toHaveText([TODO_ITEMS[1], TODO_ITEMS[2]]);
    });
  });

  test('An item can be removed when an empty text string is entered during edit', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Delete ToDo Items from the list');
    await allure.tms('TODO-143');
    await allure.issue('BUG-143');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
    await allure.step('WHEN the second item is edited and an empty string is entered', async () => {
      await todoPage.editToDo(TODO_ITEMS[1], '', 'enter');
    });
    await allure.step('THEN the second item is removed from the list', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 2 >> `).toHaveCount(2);
      await expect(todoPage.todoItems, `Expected todo items to have text [${TODO_ITEMS[0]}, ${TODO_ITEMS[2]}] >> `).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });
  });

})