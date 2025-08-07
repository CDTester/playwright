import type { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly inputBox: Locator;
  readonly todoItems: Locator;
  readonly todoLabel: Locator;
  readonly markAll: Locator;
  readonly deleteItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputBox = this.page.locator('input.new-todo');
    this.todoItems = this.page.getByTestId('todo-item');
    this.todoLabel = this.page.getByTestId('todo-title');
    this.markAll = this.page.getByLabel('Mark all as complete');
    this.deleteItem = this.page.locator('button.destroy');
  }

  async goto() {
    const url = 'https://demo.playwright.dev/todomvc/';
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        await this.page.goto(url, { timeout: 5000, waitUntil: 'domcontentloaded' });
        success = true;
      } catch (error) {
        console.warn(`Attempt ${attempt + 1} failed: ${error.message}`);
        attempt++;

        if (attempt < maxRetries) {
          // Try reloading the page instead of a full goto
          try {
            await this.page.reload({ timeout: 5000, waitUntil: 'domcontentloaded' });
          } catch (reloadError) {
            console.warn(`Reload failed: ${reloadError.message}`);
          }
        }
      }
    }

    if (!success) {
      console.error(`Failed to navigate to ${url} after ${maxRetries} attempts.`);
    }
  }

  async addToDo(text: string  | string[]) {
    if (typeof(text) === 'string') {
      await this.inputBox.fill(text);
      await this.inputBox.press('Enter');
    }
    else {
      for(const add of text) {
        await this.inputBox.fill(add);
        await this.inputBox.press('Enter');
      }
    }
  }


  async editToDo(item: string, replacementText: string, save: string) {
    const todo = this.todoItems.filter({ hasText: item });
    await todo.dblclick();
    await todo.getByLabel('Edit').fill(replacementText);
    if (save.toLowerCase() === 'blur') {
      await todo.getByLabel('Edit').dispatchEvent('blur');
    } 
    else if (save.toLowerCase() === 'enter') {
      await todo.getByLabel('Edit').press('Enter');
    }
    else if (save.toLowerCase() === 'escape') {
      await todo.getByLabel('Edit').press('Escape');
    }
  }

  async getCompleteCheckbox(item: string): Promise<Locator> {
    const todo = this.todoItems.filter({ hasText: item });
    return await todo.getByLabel('Toggle Todo');
  }

  async completeToDo(item: string) {
    const todo = this.todoItems.filter({ hasText: item });
    await todo.getByRole('checkbox').check();
  }

  async uncompleteToDo(item: string) {
    const todo = this.todoItems.filter({ hasText: item });
    await todo.getByRole('checkbox').uncheck();
  }

  async completeAllToDo() {
    await this.markAll.check();
  }

  async uncompleteAllToDo() {
    await this.markAll.uncheck();
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }
}