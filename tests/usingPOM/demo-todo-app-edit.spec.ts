import { test, expect, type Page, Locator } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';
let todo: TodoPage;
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('Edit Todo', () => {

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('Complete Checkbox should be hidden when editing', async ({ page }) => {
    let todoItem: Locator;
    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When the second item is edited', async () => {
      todoItem = todo.todoItems.nth(1);
      await todoItem.dblclick();
    });
    await test.step('Then the complete item checkbox will not be visible', async () => {
      await expect(todoItem.getByRole('checkbox')).not.toBeVisible();
    });
  });

  test('Edits are saved when the edit field is unfocused', async ({ page }) => {
    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When an item is edited and clicking outside the edit field', async () => {
      await todo.editToDo(TODO_ITEMS[1], 'feed the dog', 'blur');
    });
    await test.step('Then the changes are saved', async () => {
      await expect(todo.todoLabel).toHaveText([ TODO_ITEMS[0], 'feed the dog', TODO_ITEMS[2] ]);
      await expect(todo.todoItems).toHaveCount(3);
    });
  });

  test('Edits are saved when Enter is pressed', async ({ page }) => {
    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When an item is edited and Enter is pressed', async () => {
      await todo.editToDo(TODO_ITEMS[1], 'feed the fish', 'enter');
    });
    await test.step('Then the changes are saved', async () => {
      await expect(todo.todoLabel).toHaveText([ TODO_ITEMS[0], 'feed the fish', TODO_ITEMS[2] ]);
      await expect(todo.todoItems).toHaveCount(3);
    });
  });

  test('Whitespace before and after text is removed when saving', async ({ page }) => {
    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When an item is edited with spaces before and after text', async () => {
      await todo.editToDo(TODO_ITEMS[1], '    buy some sausages    ', 'enter');
    });
    await test.step('Then the spaces are removed when saved', async () => {
      await expect(todo.todoLabel).toHaveText([ TODO_ITEMS[0], 'buy some sausages', TODO_ITEMS[2] ]);
      await expect(todo.todoItems).toHaveCount(3);
    });
  });

  test('Cancel edit by using escape', async ({ page }) => {
    await test.step('Given the todo list already has 3 items', async () => {
      await todo.addToDo(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
    await test.step('When the escape key is pressed during edit', async () => {
      await todo.editToDo(TODO_ITEMS[1], 'feed the fish', 'escape');
    });
    await test.step('Then the the changes are not saved', async () => {
      await expect(todo.todoLabel).toHaveText(TODO_ITEMS);
      await expect(todo.todoItems).toHaveCount(3);
    });
  });

});