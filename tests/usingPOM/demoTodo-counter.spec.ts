import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';
let todo: TodoPage;
const TODO_ITEMS = [
  'keep me',
  'complete me',
  'delete me',
  'complete this one too'
];


test.describe('Todo Counter', () => {
  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('The counter should display the number of active items', async ({ page }) => {

    await test.step('Given the todo list is empty', async () => {
      await expect(todo.todoItems).toHaveCount(0);
    });
    await test.step('When an item is added', async () => {
      await todo.addToDo(TODO_ITEMS[0]);
      await expect(todo.todoItems).toHaveCount(1);
    });
    await test.step(`Then the counter should say '1 item left'`, async () => {
      await expect(todo.counter).toHaveText('1 item left');
    });

  });

  test('The counter should decrease when an item is completed', async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step(`And the counter says '4 items left'`, async () => {
      await expect(todo.counter).toHaveText('4 items left');
    });
    await test.step('When an item is marked as complete', async () => {
      await todo.completeToDo(TODO_ITEMS[1]);
    });
    await test.step(`Then the counter should say '3 items left'`, async () => {
      await expect(todo.counter).toHaveText('3 items left');
    });

  });

  test('The counter should decrease when an item is deleted', async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step(`And the counter says '4 items left'`, async () => {
      await expect(todo.counter).toHaveText('4 items left');
    });
    await test.step('When an item is deleted', async () => {
      await todo.remove(TODO_ITEMS[2]);
    });
    await test.step(`Then the counter should say '3 items left'`, async () => {
      await expect(todo.counter).toHaveText('3 items left');
    });

  });

  test('The counter should display 0 items left when all items are complete', async ({ page }) => {

    await test.step('Given the todo list has 4 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(4);
    });
    await test.step(`And the counter says '4 items left'`, async () => {
      await expect(todo.counter).toHaveText('4 items left');
    });
    await test.step('When all items are completed', async () => {
      await todo.completeAllToDo();
    });
    await test.step(`Then the counter should say '0 items left'`, async () => {
      await expect(todo.counter).toHaveText('0 items left');
    });

  });

});