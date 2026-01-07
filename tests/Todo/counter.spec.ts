import { test, expect } from '../../fixtures/todoFixture';
import * as allure from "allure-js-commons";

const TODO_ITEMS = [
  'keep me',
  'complete me',
  'delete me',
  'complete this one too'
];


test.describe('Todo Counter', {tag: ['@Todo', '@Counter']}, () => {
  
  test.beforeEach('Navigate to ToDoMVC App', async ({ todoPage }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: ToDo Item counter');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${todoPage.url} has loaded`, async ()  => {
      await todoPage.goto();
      await expect(todoPage.page, `Expexted page title to be '${todoPage.pageTitle}' >> `).toHaveTitle(todoPage.pageTitle);
      await expect(todoPage.header1, `Expected heading to be '${todoPage.header1Text}' >> `).toHaveText(todoPage.header1Text);
    });
  });

  test('The counter should increase when an item is added', {tag: ['@smoke']}, async ({ todoPage }) => {
    await allure.story('Story: Counter for active ToDo Items');
    await allure.tms('TODO-131');
    await allure.issue('BUG-131');
    await allure.severity(allure.Severity.BLOCKER);

    await allure.step('GIVEN the todo list is empty', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 0 todo items >> ').toHaveCount(0);
    });
    await allure.step('WHEN an item is added', async (step) => {
      await todoPage.addToDo(TODO_ITEMS[0]);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected 1 todo item >> `).toHaveCount(1);
    });
    await allure.step(`THEN the counter should say '1 item left'`, async () => {
      await expect(todoPage.counter, `Expected counter to say '1 item left' >> `).toHaveText('1 item left');
    });
  });


  test('The counter should decrease WHEN an item is completed', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Counter for active ToDo Items');
    await allure.tms('TODO-132');
    await allure.issue('BUG-132');
    await allure.severity(allure.Severity.CRITICAL);

    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 4 todo items >> ').toHaveCount(4);
    });
    await allure.step(`AND the counter says '4 items left'`, async () => {
      await expect(todoPage.counter, `Expected counter to say '4 items left' >> `).toHaveText('4 items left');
    });
    await allure.step('WHEN an item is marked as complete', async () => {
      await todoPage.completeToDo(TODO_ITEMS[1]);
    });
    await allure.step(`THEN the counter should say '3 items left'`, async () => {
      await expect(todoPage.counter, `Expected counter to say '3 items left' >> `).toHaveText('3 items left');
    });
  });


  test('The counter should display 0 items left WHEN all items are complete', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Counter for active ToDo Items');
    await allure.tms('TODO-133');
    await allure.issue('BUG-133');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 4 todo items >> ').toHaveCount(4);
    });
    await allure.step(`AND the counter says '4 items left'`, async () => {
      await expect(todoPage.counter, `Expected counter to say '4 items left' >> `).toHaveText('4 items left');
    });
    await allure.step('WHEN all items are completed', async () => {
      await todoPage.completeAllToDo();
    });
    await allure.step(`THEN the counter should say '0 items left'`, async () => {
      await expect(todoPage.counter, `Expected counter to say '0 items left' >> `).toHaveText('0 items left');
    });
  });


  test('The counter should decrease WHEN an item is deleted', {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Counter for active ToDo Items');
    await allure.tms('TODO-134');
    await allure.issue('BUG-134');
    await allure.severity(allure.Severity.MINOR);

    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 4 todo items >> ').toHaveCount(4);
    });
    await allure.step(`AND the counter says '4 items left'`, async () => {
      await expect(todoPage.counter, `Expected counter to say '4 items left' >> `).toHaveText('4 items left');
    });
    await allure.step('WHEN an item is deleted', async () => {
      await todoPage.remove(TODO_ITEMS[2]);
    });
    await allure.step(`THEN the counter should say '3 items left'`, async () => {
      await expect(todoPage.counter, `Expected counter to say '3 items left' >> `).toHaveText('3 items left');
    });
  });

});