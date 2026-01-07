import { test, expect } from '../../fixtures/todoFixture';
import type { Locator } from '@playwright/test';
import * as allure from "allure-js-commons";

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];


test.describe('Complete Todo', {tag: ['@Todo', '@Complete']}, () => {

  test.beforeEach('Navigate to ToDoMVC App', async ({ todoPage }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Complete ToDo Items');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${todoPage.url} has loaded`, async ()  => {
      await todoPage.goto();
      await expect(todoPage.page, `Expexted page title to be '${todoPage.pageTitle}' >> `).toHaveTitle(todoPage.pageTitle);
      await expect(todoPage.header1, `Expected heading to be '${todoPage.header1Text}' >> `).toHaveText(todoPage.header1Text);
    });
  });

  test('All items checkbox should be initially unchecked', {tag: ['@smoke']}, async ({ todoPage }) => {
    await allure.story('Story: Complete ToDo Items from the list');
    await allure.tms('TODO-121');
    await allure.issue('BUG-121');
    await allure.severity(allure.Severity.BLOCKER);

    let todoCheckbox1: Locator;
    let todoCheckbox2: Locator;
    let todoCheckbox3: Locator;

    await allure.step('GIVEN the todo list is empty', async () => {
      await expect(todoPage.todoItems).toHaveCount(0);
    });
    await allure.step('WHEN 3 items are added to the todo list', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 3 todo items >> ').toHaveCount(3);

      todoCheckbox1 = await todoPage.getCompleteCheckbox(TODO_ITEMS[0]);
      todoCheckbox2 = await todoPage.getCompleteCheckbox(TODO_ITEMS[1]);
      todoCheckbox3 = await todoPage.getCompleteCheckbox(TODO_ITEMS[2]);
    });
    await allure.step('THEN the complete item checkbox will be visible', async () => {
      await expect(todoCheckbox1, `Expected [${TODO_ITEMS[0]}] to be visible >> `).toBeVisible();
      await expect(todoCheckbox2, `Expected [${TODO_ITEMS[1]}] to be visible >> `).toBeVisible();
      await expect(todoCheckbox3, `Expected [${TODO_ITEMS[2]}] to be visible >> `).toBeVisible();
    });
    await allure.step('AND the complete item checkbox will be unchecked', async () => {
      await expect(todoCheckbox1, `Expected [${TODO_ITEMS[0]}] to be unchecked >> `).not.toBeChecked();
      await expect(todoCheckbox2, `Expected [${TODO_ITEMS[1]}] to be unchecked >> `).not.toBeChecked();
      await expect(todoCheckbox3, `Expected [${TODO_ITEMS[2]}] to be unchecked >> `).not.toBeChecked();
    });
  });


  test('Items can be marked as complete', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Complete ToDo Items from the list');
    await allure.tms('TODO-122');
    await allure.issue('BUG-122');
    await allure.severity(allure.Severity.CRITICAL);

    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 3 todo items >> ').toHaveCount(3);
    });
    await allure.step('WHEN the first item is marked as complete', async () => {
      todoPage.completeToDo(TODO_ITEMS[0]);
    });
    await allure.step('THEN the complete checkbox wil be checked', async () => {
      const todoCheckbox = await todoPage.getCompleteCheckbox(TODO_ITEMS[0]);
      await expect(todoCheckbox, `Expected [${TODO_ITEMS[0]}] to be checked >> `).toBeChecked();
    });
    await allure.step('AND the items text will be struckthrough', async () => {
      const todoItem = await todoPage.todoItems.nth(0);
      const todoTitle = await todoItem.locator(todoPage.todoLabel);
      await expect(todoItem, `Expected [${TODO_ITEMS[0]}] to have class='completed' >> `).toHaveClass('completed');
      await expect(todoTitle, `Expected [${TODO_ITEMS[0]}] to be struckthrough >> `).toHaveCSS('text-decoration-line', 'line-through');
    });
  });


  test('Completed item can be marked as active again', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Complete ToDo Items from the list');
    await allure.tms('TODO-123');
    await allure.issue('BUG-123');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 3 todo items >> ').toHaveCount(3);
    });
    await allure.step('AND the first item is marked as complete', async () => {
      await todoPage.completeToDo(TODO_ITEMS[0]);
      const todoCheckbox = await todoPage.getCompleteCheckbox(TODO_ITEMS[0]);
      await expect(todoCheckbox, `Expected ${TODO_ITEMS[0]} to be checked >> `).toBeChecked();
    });
    await allure.step('WHEN the item is un-checked', async () => {
      await todoPage.uncompleteToDo(TODO_ITEMS[0]);
    });
    await allure.step('THEN the complete checkbox wil be checked', async () => {
      const todoCheckbox = await todoPage.getCompleteCheckbox(TODO_ITEMS[0]);
      await expect(todoCheckbox, `Expected ${TODO_ITEMS[0]} to be unchecked`).not.toBeChecked();
    });
    await allure.step('AND the items text will no longer be struckthrough', async () => {
      const todoItem = await todoPage.todoItems.nth(0);
      await expect(todoItem, `Expected ${TODO_ITEMS[0]} to not have class='completed' >> `).not.toHaveClass('completed');
    });
  });


  test('All items can be marked as completed in one click', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Complete ToDo Items from the list');
    await allure.tms('TODO-124');
    await allure.issue('BUG-124');
    await allure.severity(allure.Severity.MINOR);

    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 3 todo items >> ').toHaveCount(3);
    });
    await allure.step('AND the item are not marked as complete', async () => {
      await expect(todoPage.todoItems, `Expected all items to not have class='completed' >> `).not.toHaveClass(['completed', 'completed', 'completed']);
    });
    await allure.step(`WHEN the 'mark all' button is clicked`, async () => {
      await todoPage.completeAllToDo();
    });
    await allure.step('THEN the completed item checkboxes will be checked', async () => {
      await expect(todoPage.todoItems,`Expected all items to have class='completed'`).toHaveClass(['completed', 'completed', 'completed']);
      await expect(todoPage.todoLabel.filter({hasText: TODO_ITEMS[0]}),`Expected [${TODO_ITEMS[0]}] to have CSS text-decoration-line:line-through >> `).toHaveCSS('text-decoration-line', 'line-through');
      await expect(todoPage.todoLabel.filter({hasText: TODO_ITEMS[1]}),`Expected [${TODO_ITEMS[1]}] to have CSS text-decoration-line:line-through >> `).toHaveCSS('text-decoration-line', 'line-through');
      await expect(todoPage.todoLabel.filter({hasText: TODO_ITEMS[2]}),`Expected [${TODO_ITEMS[2]}] to have CSS text-decoration-line:line-through >> `).toHaveCSS('text-decoration-line', 'line-through');
      
      const todoCheckbox1 = await todoPage.getCompleteCheckbox(TODO_ITEMS[0]);
      const todoCheckbox2 = await todoPage.getCompleteCheckbox(TODO_ITEMS[1]);
      const todoCheckbox3 = await todoPage.getCompleteCheckbox(TODO_ITEMS[2]);
      await expect(todoCheckbox1,`Expected [${TODO_ITEMS[0]}] to be checked >> `).toBeChecked();
      await expect(todoCheckbox2,`Expected [${TODO_ITEMS[1]}] to be checked >> `).toBeChecked();
      await expect(todoCheckbox3,`Expected [${TODO_ITEMS[2]}] to be checked >> `).toBeChecked();
    });
  });


  test('All completed items can be marked as incomplete in one click', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Complete ToDo Items from the list');
    await allure.tms('TODO-125');
    await allure.issue('BUG-125');
    await allure.severity(allure.Severity.TRIVIAL);

    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 3 todo items >> ').toHaveCount(3);
    });
    await allure.step('AND all the items are marked as complete', async () => {
      await todoPage.completeAllToDo();
    });
    await allure.step(`WHEN the 'mark all' button is clicked again`, async () => {
      await todoPage.uncompleteAllToDo();
    });
    await allure.step('THEN the completed item checkboxes will not be checked', async () => {
      await expect(todoPage.todoItems, `Expected all items to not have class='completed' >> `).not.toHaveClass(['completed', 'completed', 'completed']);
    });
  });

});
