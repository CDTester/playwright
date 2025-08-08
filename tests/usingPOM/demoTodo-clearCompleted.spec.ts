import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';
let todo: TodoPage;
const TODO_ITEMS = [
  'keep me',
  'complete me',
  'delete me',
  'complete this one too'
];


test.describe('Clear Completed Todo', () => {
  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
    await todo.addToDo(TODO_ITEMS);
  });

  test(`The 'Clear Completed' button is hidden when there are no completed items`, async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step('When all items are active', async () => {
      const allFillter = todo.filters.filter({ hasText: 'All' });
      await expect(allFillter.getByRole('link', { name: 'All' })).toHaveClass('selected');
    });
    await test.step(`Then the 'Clear Completed' button is hidden`, async () => {
      await expect(todo.clear).toBeHidden();
    });

  });

  test(`The 'Clear Completed' button is visible when there are completed items`, async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step('When at least 1 item is completed', async () => {
      await todo.completeToDo(TODO_ITEMS[1]);
    });
    await test.step(`Then the 'Clear Completed' button is visible`, async () => {
      await expect(todo.clear).toBeVisible();
    });

  });

  test(`The 'Clear Completed' button should remove completed items`, async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step('And at least 2 items are completed', async () => {
      await todo.completeToDo(TODO_ITEMS[1]);
      await todo.completeToDo(TODO_ITEMS[3]);
    });
    await test.step(`When the 'Clear Completed' button is clicked`, async () => {
      await todo.clear.click();
    });
    await test.step(`Then the completed items are removed`, async () => {
      await expect(todo.todoItems).toHaveCount(2);
      await expect(todo.todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });

  });


});