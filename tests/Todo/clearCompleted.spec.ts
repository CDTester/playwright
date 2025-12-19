import { test, expect } from '../../fixtures/todoFixture';
import * as allure from "allure-js-commons";

const TODO_ITEMS = [
  'keep me',
  'complete me',
  'delete me',
  'complete this one too'
];


test.describe('Clear Completed Todo', {tag: ['@Todo', '@Clear']}, async () => {

  test.beforeEach('Navigate to ToDoMVC App and add items', async ({ todoPage }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Clear ToDo Items');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${todoPage.url} has loaded`, async ()  => {
      await todoPage.goto();
      await expect(todoPage.page, `Expexted page title to be '${todoPage.pageTitle}' >> `).toHaveTitle(todoPage.pageTitle);
      await expect(todoPage.header1, `Expected heading to be '${todoPage.header1Text}' >> `).toHaveText(todoPage.header1Text);
    });

    await allure.step(`AND 4 items are added to the list`, async () => {
      await todoPage.addToDo(TODO_ITEMS);
    });
  });


  test(`The 'Clear Completed' button is hidden when there are no completed items`, {tag: ['@smoke']}, async ({ todoPage }) => {
    await allure.story('Story: Clear Completed ToDo Item from the list');
    await allure.tms('TODO-111');
    await allure.issue('BUG-111');
    await allure.severity(allure.Severity.BLOCKER);
        
    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 4 todo items >> ').toHaveCount(4);
    });
    await allure.step('WHEN the "All" filter is selected', async (step) => {
      const allFillter = todoPage.filters.filter({ hasText: 'All' });
      await expect(allFillter.getByRole('link', { name: 'All' }), 'Expected "All" to be selected >> ').toHaveClass('selected');
    });
    await allure.step(`THEN the 'Clear Completed' button is hidden`, async (step) => {
      await expect(todoPage.clear, 'Expected "Clear completed" button to be hidden >> ').toBeHidden();
    });
  });


  test(`The 'Clear Completed' button is visible when there are completed items`, {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Clear Completed ToDo Item from the list');
    await allure.tms('TODO-112');
    await allure.issue('BUG-112');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 4 todo items >> ').toHaveCount(4);
    });
    await allure.step(`AND the 'Clear Completed' button is hidden`, async (step) => {
      await expect(todoPage.clear, 'Expected "Clear completed" button to be hidden >> ').toBeHidden();
    });
    await allure.step('WHEN at least 1 item is completed', async (step) => {
      await todoPage.completeToDo(TODO_ITEMS[1]);
    });
    await allure.step(`THEN the 'Clear Completed' button is visible`, async (step) => {
      await expect(todoPage.clear, 'Expected "Clear completed" button to be visible >> ').toBeVisible();
    });
  });


  test(`The 'Clear Completed' button should remove completed items`, {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Clear Completed ToDo Item from the list');
    await allure.tms('TODO-113');
    await allure.issue('BUG-113');
    await allure.severity(allure.Severity.MINOR);

    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 4 todo items >> ').toHaveCount(4);
    });
    await allure.step('And at least 2 items are completed', async (step) => {
      await todoPage.completeToDo(TODO_ITEMS[1]);
      await todoPage.completeToDo(TODO_ITEMS[3]);
    });
    await allure.step(`WHEN the 'Clear Completed' button is clicked`, async (step) => {
      await todoPage.clear.click();
    });
    await allure.step(`THEN the completed items are removed`, async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, 'Expected 2 todo items >> ').toHaveCount(2);
      await expect(todoPage.todoItems, `Expected list to only show [${TODO_ITEMS[0]}] and [${TODO_ITEMS[2]}] >> `).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });

  });


});