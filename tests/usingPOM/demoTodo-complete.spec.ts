import { test, expect, Locator } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';
let todo: TodoPage;
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];


test.describe('Complete Todo', () => {

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('All items checkbox should be initially unchecked', async ({ page }) => {
    let todoCheckbox1: Locator;
    let todoCheckbox2: Locator;
    let todoCheckbox3: Locator;

    await test.step('Given the todo list is empty', async () => {
      await expect(todo.todoItems).toHaveCount(0);
    });
    await test.step('When items are added to the todo list', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);

      todoCheckbox1 = await todo.getCompleteCheckbox(TODO_ITEMS[0]);
      todoCheckbox2 = await todo.getCompleteCheckbox(TODO_ITEMS[1]);
      todoCheckbox3 = await todo.getCompleteCheckbox(TODO_ITEMS[2]);
    });
    await test.step('Then the complete item checkbox will be unchecked', async () => {
      await expect(todoCheckbox1).toBeVisible();
      await expect(todoCheckbox2).toBeVisible();
      await expect(todoCheckbox3).toBeVisible();

      await expect(todoCheckbox1).not.toBeChecked();
      await expect(todoCheckbox2).not.toBeChecked();
      await expect(todoCheckbox3).not.toBeChecked();
    });
  });

  test('Items can be marked as complete', async ({ page }) => {

    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When the second item is edited', async () => {
      todo.completeToDo(TODO_ITEMS[0]);
    });
    await test.step('Then the complete checkbox wil be checked', async () => {
      const todoCheckbox = await todo.getCompleteCheckbox(TODO_ITEMS[0]);
      await expect(todoCheckbox).toBeChecked();
    });
    await test.step('And the items text will be struckthrough', async () => {
      const todoItem = await todo.todoItems.nth(0);
      await expect(todoItem).toHaveClass('completed');
    });

  });

  test('Completed item can be marked as active', async ({ page }) => {

    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('And an item is marked as complete', async () => {
      await todo.completeToDo(TODO_ITEMS[0]);
    });
    await test.step('When the item is un-checked', async () => {
      await todo.uncompleteToDo(TODO_ITEMS[0]);
    });
    await test.step('Then the complete checkbox wil be checked', async () => {
      const todoCheckbox = await todo.getCompleteCheckbox(TODO_ITEMS[0]);
      await expect(todoCheckbox).not.toBeChecked();
    });
    await test.step('And the items text will no longer be struckthrough', async () => {
      const todoItem = await todo.todoItems.nth(0);
      await expect(todoItem).not.toHaveClass('completed');
    });

  });

  test('All items can be marked as completed in one click', async ({ page }) => {

    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('And the item are not marked as complete', async () => {
      await expect(todo.todoItems).not.toHaveClass(['completed', 'completed', 'completed']);
    });
    await test.step(`When the 'mark all' button is clicked`, async () => {
      await todo.completeAllToDo();
    });
    await test.step('Then the completed item checkboxes will be checked', async () => {
      await expect(todo.todoItems).toHaveClass(['completed', 'completed', 'completed']);
    });

  });

  test('All completed items can be marked as active in one click', async ({ page }) => {

    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('And all the items are marked as complete', async () => {
      await todo.completeAllToDo();
    });
    await test.step(`When the 'mark all' button is clicked`, async () => {
      await todo.uncompleteAllToDo();
    });
    await test.step('Then the completed item checkbox will not be un-checked', async () => {
      await expect(todo.todoItems).not.toHaveClass(['completed', 'completed', 'completed']);
    });

  });

});
