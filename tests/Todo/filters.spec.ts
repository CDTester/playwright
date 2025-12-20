import { test, expect } from '../../fixtures/todoFixture';
import * as allure from "allure-js-commons";

const TODO_ITEMS = [
  'keep me',
  'complete me',
  'delete me',
  'complete this one too'
];


test.describe('Todo Filters', {tag: ['@Todo', '@Filter']}, () => {

  test.beforeEach('Navigate to ToDoMVC App', async ({ todoPage }) => {
    await allure.epic('Epic: TodoMVC');
    await allure.feature('Feature: Filter ToDo Items');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${todoPage.url} has loaded`, async ()  => {
      await todoPage.goto();
      await expect(todoPage.page, `Expexted page title to be '${todoPage.pageTitle}' >> `).toHaveTitle(todoPage.pageTitle);
      await expect(todoPage.header1, `Expected heading to be '${todoPage.header1Text}' >> `).toHaveText(todoPage.header1Text);
    });
  });


  test('There should be 3 filters available when there are items on the list', {tag: ['@smoke']}, async ({ todoPage }) => {
    await allure.story('Story: Filter active and complete ToDo Items from the list');
    await allure.tms('TODO-161');
    await allure.issue('BUG-161');
    await allure.severity(allure.Severity.BLOCKER);

    await allure.step('GIVEN the todo list is empty', async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be empty >> `).toHaveCount(0);
    });
    await allure.step('AND the filters are not visisble', async () => {
      await expect(todoPage.filters, `Expected filters to be hidden >> `).not.toBeVisible();
    });
    await allure.step('WHEN items are added', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be 4 >> `).toHaveCount(4);
    });
    await allure.step(`THEN the 'All' filter should be visible and selected by default`, async () => {
      const allFillter = todoPage.filters.filter({ hasText: 'All' });
      await expect(allFillter, `Expected 'All' filter to be visible >> `).toBeVisible();
      await expect(allFillter.getByRole('link', { name: 'All' }), `Expected 'All' filter to be selected >> `).toHaveClass('selected');
    });
    await allure.step(`AND the 'Active' filter should be visible`, async () => {
      const activeFillter = todoPage.filters.filter({ hasText: 'Active' });
      await expect(activeFillter, `Expected 'Active' filter to be visible >> `).toBeVisible();
      await expect(activeFillter.getByRole('link', { name: 'Active' }), `Expected 'Active' filter to be unselected >> `).not.toHaveClass('selected');
    });
    await allure.step(`AND the 'Completed' filter should be visible`, async () => {
      const completedFillter = todoPage.filters.filter({ hasText: 'Completed' });
      await expect(completedFillter, `Expected 'Completed' filter to be visible >> `).toBeVisible();
      await expect(completedFillter.getByRole('link', { name: 'Completed' }), `Expected 'Completed' filter to be unselected >> `).not.toHaveClass('selected');
    });
  });


  test(`The 'All' filter should show active and completed items`, {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Filter active and complete ToDo Items from the list');
    await allure.tms('TODO-162');
    await allure.issue('BUG-162');
    await allure.severity(allure.Severity.CRITICAL);
    
    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be 4 >> `).toHaveCount(4);
    });
    await allure.step(`AND 2 items are completed`, async (step) => {
      await todoPage.completeToDo(TODO_ITEMS[1]);
      await todoPage.completeToDo(TODO_ITEMS[3]);
      await step.parameter('Completed ToDo Items', `${TODO_ITEMS[1]}, ${TODO_ITEMS[3]}`);
    });
    await allure.step(`WHEN the 'All' filter is selected`, async () => {
      await todoPage.applyFilter('All');
    });
    await allure.step(`THEN all 4 items are still visible`, async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await step.parameter('Visible ToDo Items', (await todoPage.getVisibleItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be 4 >> `).toHaveCount(4);
    });
  });


  test(`The 'Active' filter should show only active items`, {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Filter active and complete ToDo Items from the list');
    await allure.tms('TODO-163');
    await allure.issue('BUG-163');
    await allure.severity(allure.Severity.NORMAL);
    
    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be 4 >> `).toHaveCount(4);
    });
    await allure.step(`AND 1 item is completed`, async (step) => {
      await todoPage.completeToDo(TODO_ITEMS[1]);
      step.parameter('Completed ToDo Item', TODO_ITEMS[1]);
    });
    await allure.step(`WHEN the 'Active' filter is selected`, async () => {
      await todoPage.applyFilter('Active');
    });
    await allure.step(`THEN only 3 items are visible`, async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await step.parameter('Visible ToDo Items', (await todoPage.getVisibleItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be 3 >> `).toHaveCount(3);
    });
  });

  test(`The 'Completed' filter should only show completed items`, {tag: ['@regression']}, async ({ todoPage }) => {
    await allure.story('Story: Filter active and complete ToDo Items from the list');
    await allure.tms('TODO-164');
    await allure.issue('BUG-164');
    await allure.severity(allure.Severity.MINOR);
    
    await allure.step('GIVEN the todo list has 4 items', async (step) => {
      await todoPage.addToDo(TODO_ITEMS);
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be 4 >> `).toHaveCount(4);
    });
    await allure.step(`AND 1 items is completed`, async (step) => {
      await todoPage.completeToDo(TODO_ITEMS[1]);
      step.parameter('Completed ToDo Item', TODO_ITEMS[1]);
    });
    await allure.step(`WHEN the 'Completed' filter is selected`, async () => {
      await todoPage.applyFilter('Completed');
    });
    await allure.step(`THEN only 1 item is visible`, async (step) => {
      await step.parameter('ToDo Items', (await todoPage.getItems()).join(('; ')) || 'No items');
      await step.parameter('Visible ToDo Items', (await todoPage.getVisibleItems()).join(('; ')) || 'No items');
      await expect(todoPage.todoItems, `Expected todo items to be 1 >> `).toHaveCount(1);
    });
  });

});