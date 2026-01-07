import { test, expect } from '../../fixtures/todoFixture';
import * as allure from "allure-js-commons";

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('Add Todo', {tag: ['@Todo', '@Add']}, async () => {

  test.beforeEach('Navigate to ToDoMVC App', async ( {todoPage} ) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Add ToDo Item');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${todoPage.url} has loaded`, async ( step ) => {
      await todoPage.goto();
      await expect(todoPage.page, `Expexted page title to be '${todoPage.pageTitle}' >> `).toHaveTitle(todoPage.pageTitle);
      await expect(todoPage.header1, `Expected heading to be '${todoPage.header1Text}' >> `).toHaveText(todoPage.header1Text);
    });
  });

  test('Item can be added to ToDo list', {tag: ['@smoke']}, async ({ todoPage }) => {
    await allure.story('Story: Add ToDo Item to the list');
    await allure.tms('TODO-101');
    await allure.issue('BUG-101');
    await allure.severity(allure.Severity.BLOCKER);
    // await allure.description('This test case will verify that an item can be added to the ToDo list');

    await allure.step('GIVEN the toDo list is empty', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 0 todo items >> ').toHaveCount(0);
    });
    await allure.step('WHEN an item is added', async (step) => {
      await step.parameter('Add Item', TODO_ITEMS[0]);
      await todoPage.addToDo(TODO_ITEMS[0]);
    });
    await allure.step('THEN the item is visible in the list', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoLabel, `Expected todo list to have [${TODO_ITEMS[0]}] >> `).toHaveText([TODO_ITEMS[0]]);
    });
  });

  test('The input field should be cleared when the item is added', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Add ToDo Item to the list');
    await allure.tms('TODO-102');
    await allure.issue('BUG-102');
    await allure.severity(allure.Severity.CRITICAL);
    
    await allure.step('GIVEN the toDo list is empty', async ( step ) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 0 todo items >> ').toHaveCount(0);
    });
    await allure.step('WHEN an item is added', async () => {
      await todoPage.addToDo(TODO_ITEMS[0]);
    });
    await allure.step('THEN the item is cleared from the input field', async ( step ) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.inputBox, 'Expected input field to be empty >> ').toBeEmpty();
    });
  });

  test('Item should be appended to the bottom of the list', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Add ToDo Item to the list');
    await allure.tms('TODO-103');
    await allure.issue('BUG-103');
    await allure.severity(allure.Severity.NORMAL);
    
    await allure.step('GIVEN the toDo list is empty', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 0 todo items >> ').toHaveCount(0);
    });
    await allure.step('WHEN 3 items are added', async () => {
      await todoPage.addToDo(TODO_ITEMS);
    });
    await allure.step('THEN the items should appear in the order they were added', async (step) => {
      await expect(todoPage.todoLabel, `Expected todo items: [${TODO_ITEMS.join('; ')}] >> `).toHaveText(TODO_ITEMS);
    });
    await allure.step('AND there should be 3 items in the list', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 3 todo items >> ').toHaveCount(3);
    });
  });

});