import { test, expect, type Page } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';
let todo: TodoPage;
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

test.describe('Add Todo', () => {

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('Allow an item to be added to ToDo', async ({ page }) => {
    await test.step('Given the toDo list is empty', async () => {
      await expect(todo.todoItems).toHaveCount(0);
    });
    await test.step('When an item is added', async () => {
      await todo.addToDo(TODO_ITEMS[0]);
    });
    await test.step('Then the item is visible in the list', async () => {
      await expect(todo.todoLabel).toHaveText([ TODO_ITEMS[0] ]);
    });
  });

  test('Item should be cleared from the input field when an item is added', async ({ page }) => {
    await test.step('Given the toDo list is empty', async () => {
      await expect(todo.todoItems).toHaveCount(0);
    });
    await test.step('When an item is added', async () => {
      await todo.addToDo(TODO_ITEMS[0]);
    });
    await test.step('Then the item is cleared from the input field', async () => {
      await expect(todo.inputBox).toBeEmpty();
    });
  });

  test('Item should be appended to the bottom of the list', async ({ page }) => {
    await test.step('Given the toDo list is empty', async () => {
      await expect(todo.todoItems).toHaveCount(0);
    });
    await test.step('When an item is added', async () => {
      await todo.addToDo(TODO_ITEMS[0]);
    });
    await test.step('And a second item is added', async () => {
      await todo.addToDo(TODO_ITEMS[1]);
    });
    await test.step('And a third item is added', async () => {
      await todo.addToDo(TODO_ITEMS[2]);
    });
    await test.step('Then the items should appear in the order they were added', async () => {
      await expect(todo.todoLabel).toHaveText(TODO_ITEMS);
    });
    await test.step('And there should be 3 items in the list', async () => {
      await expect(todo.todoItems).toHaveCount(3);
    });
  });

});