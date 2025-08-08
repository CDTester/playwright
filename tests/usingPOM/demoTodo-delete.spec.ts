import { test, expect, Locator } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';
let todo: TodoPage;
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];


test.describe('Delete Todo', () => {
  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('The delete button should be visible on hover', async ({ page }) => {
    let item: Locator;
    let deleteButton: Locator;

    await test.step('Given the todo list already has 1 item', async () => {
      await todo.addToDo(TODO_ITEMS[0]);
      await expect(todo.todoItems).toHaveCount(1);
    });
    await test.step('And the delete button is not visible', async () => {
      item = await todo.todoItems.first();
      deleteButton = item.locator('button.destroy');
      expect(deleteButton).not.toBeVisible();
    });
    await test.step('When an item is hovered over', async () => {
      await item.hover();
    });
    await test.step('Then the delete button is visible', async () => {
      await expect(deleteButton).toBeVisible();
    });

  });

  test('An item can be removed from using the delete button', async ({ page }) => {

    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When the delete button clicked on the first item', async () => {
      await todo.remove(TODO_ITEMS[0]);
    });
    await test.step('Then the first item is removed from the list', async () => {
      await expect(todo.todoItems).toHaveCount(2);
      await expect(todo.todoItems).toHaveText([TODO_ITEMS[1], TODO_ITEMS[2]]);
    });

  });

  test('An item can be removed when an empty text string is entered during edit', async ({ page }) => {

    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When the second item is edited and an empty string is entered', async () => {
      await todo.editToDo(TODO_ITEMS[1], '', 'enter');
    });
    await test.step('Then the second item is removed from the list', async () => {
      await expect(todo.todoItems).toHaveCount(2);
      await expect(todo.todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });

  });

});