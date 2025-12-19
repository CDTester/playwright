import { test, expect } from '../../fixtures/todoFixture';
import type { Locator } from '@playwright/test';
import * as allure from "allure-js-commons";

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('Edit Todo', {tag: ['@Todo', '@Edit']}, () => {

  test.beforeEach('Navigate to ToDoMVC App', async ({ todoPage }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Edit ToDo Items');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${todoPage.url} has loaded`, async ()  => {
      await todoPage.goto();
      await expect(todoPage.page, `Expexted page title to be '${todoPage.pageTitle}' >> `).toHaveTitle(todoPage.pageTitle);
      await expect(todoPage.header1, `Expected heading to be '${todoPage.header1Text}' >> `).toHaveText(todoPage.header1Text);
    });
  });


  test('Complete Checkbox should be hidden when editing', {tag: ['@smoke']}, async ({ todoPage }) => {
    await allure.story('Story: Edit ToDo Items from the list');
    await allure.tms('TODO-151');
    await allure.issue('BUG-151');
    await allure.severity(allure.Severity.BLOCKER);
    let todoItem: Locator;

    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
    await allure.step('WHEN the second item is edited', async (step) => {
      await step.parameter('ToDo Item to be edited', (await todoPage.getItems())[1].toString());
      todoItem = todoPage.todoItems.nth(1);
      await todoItem.dblclick();
    });
    await allure.step('THEN the complete item checkbox will not be visible', async () => {
      await expect(todoItem.getByRole('checkbox'), 'Expected checkbox to be hidden during edit >> ').not.toBeVisible();
    });
  });


  test('Edits are saved when the edit field is unfocused', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Edit ToDo Items from the list');
    await allure.tms('TODO-152');
    await allure.issue('BUG-152');
    await allure.severity(allure.Severity.CRITICAL);
    
    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
    await allure.step('WHEN an item is edited and clicking outside the edit field', async (step) => {
      await step.parameter('ToDo Items edited', `${TODO_ITEMS[1]} to 'feed the dog'`);
      await todoPage.editToDo(TODO_ITEMS[1], 'feed the dog', 'blur');
    });
    await allure.step('THEN the changes are saved', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoLabel, 'Expected todo label to have updated text >> ').toHaveText([TODO_ITEMS[0], 'feed the dog', TODO_ITEMS[2]]);
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
  });


  test('Edits are saved when Enter is pressed', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Edit ToDo Items from the list');
    await allure.tms('TODO-153');
    await allure.issue('BUG-153');
    await allure.severity(allure.Severity.NORMAL);
    
    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
    await allure.step('WHEN an item is edited and Enter is pressed', async (step) => {
      await step.parameter('ToDo Items edited', `${TODO_ITEMS[1]} to 'feed the fish'`);
      await todoPage.editToDo(TODO_ITEMS[1], 'feed the fish', 'enter');
    });
    await allure.step('THEN the changes are saved', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoLabel, `Expected second item to be 'feed the fish' >> `).toHaveText([TODO_ITEMS[0], 'feed the fish', TODO_ITEMS[2]]);
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
  });


  test('Whitespace before and after text is removed when saving', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Edit ToDo Items from the list');
    await allure.tms('TODO-154');
    await allure.issue('BUG-154');
    await allure.severity(allure.Severity.MINOR);
    
    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
    await allure.step('WHEN an item is edited with spaces before and after text', async (step) => {
      await step.parameter('ToDo Items edited', `${TODO_ITEMS[1]} to '    buy some sausages    '`);
      await todoPage.editToDo(TODO_ITEMS[1], '    buy some sausages    ', 'enter');
    });
    await allure.step('THEN the spaces are removed when saved', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoLabel, `Expected second item to be 'buy some sausages' >> `).toHaveText([TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2]]);
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
  });


  test('Cancel edit by using escape', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Edit ToDo Items from the list');
    await allure.tms('TODO-155');
    await allure.issue('BUG-155');
    await allure.severity(allure.Severity.TRIVIAL);
    
    await allure.step('GIVEN the todo list already has 3 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
    await allure.step('WHEN the escape key is pressed during edit', async (step) => {
      await step.parameter('ToDo Items edited', `${TODO_ITEMS[1]} to 'feed the fish' but cancelled by typing escape`);
      await todoPage.editToDo(TODO_ITEMS[1], 'feed the fish', 'escape');
    });
    await allure.step('THEN the the changes are not saved', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoLabel, `Expected todo label to have original text >> `).toHaveText(TODO_ITEMS);
      await expect(todoPage.todoItems, `Expected todo items to have count of 3 >> `).toHaveCount(3);
    });
  });

});