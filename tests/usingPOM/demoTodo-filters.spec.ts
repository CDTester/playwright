import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';
let todo: TodoPage;
const TODO_ITEMS = [
  'keep me',
  'complete me',
  'delete me',
  'complete this one too'
];


test.describe('Todo Filters', () => {
  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('There should be 3 filters available when there are items on the list', async ({ page }) => {

    await test.step('Given the todo list is empty', async () => {
      await expect(todo.todoItems).toHaveCount(0);
    });
    await test.step('And the filters are not visisble', async () => {
      await expect(todo.filters).not.toBeVisible();
    });
    await test.step('When items are added', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step(`Then the 'All' filter should be visible and selected by default`, async () => {
      const allFillter = todo.filters.filter({ hasText: 'All' });
      await expect(allFillter).toBeVisible();
      await expect(allFillter.getByRole('link', { name: 'All' })).toHaveClass('selected');
    });
    await test.step(`And the 'Active' filter should be visible`, async () => {
      const activeFillter = todo.filters.filter({ hasText: 'Active' });
      await expect(activeFillter).toBeVisible();
      await expect(activeFillter.getByRole('link', { name: 'Active' })).not.toHaveClass('selected');
    });
    await test.step(`And the 'Completed' filter should be visible`, async () => {
      const completedFillter = todo.filters.filter({ hasText: 'Completed' });
      await expect(completedFillter).toBeVisible();
      await expect(completedFillter.getByRole('link', { name: 'Completed' })).not.toHaveClass('selected');
    });

  });

  test(`The 'All' filter should show active and completed items`, async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step(`And 2 items are completed`, async () => {
      await todo.completeToDo(TODO_ITEMS[1]);
      await todo.completeToDo(TODO_ITEMS[3]);
    });
    await test.step(`When the 'All' filter is selected`, async () => {
      await todo.applyFilter('All');
    });
    await test.step(`Then all 4 items are still visible`, async () => {
      await expect(todo.todoItems).toHaveCount(4);
    });

  });

  test(`The 'Active' filter should show only active items`, async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step(`And 1 item is completed`, async () => {
      await todo.completeToDo(TODO_ITEMS[1]);
    });
    await test.step(`When the 'Active' filter is selected`, async () => {
      await todo.applyFilter('Active');
    });
    await test.step(`Then only 3 items are visible`, async () => {
      await expect(todo.todoItems).toHaveCount(3);
    });

  });

  test(`The 'Completed' filter should only show completed items`, async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step(`And 1 items is completed`, async () => {
      await todo.completeToDo(TODO_ITEMS[1]);
    });
    await test.step(`When the 'Completed' filter is selected`, async () => {
      await todo.applyFilter('Completed');
    });
    await test.step(`Then only 1 item is visible`, async () => {
      await expect(todo.todoItems).toHaveCount(1);
    });

  });

});