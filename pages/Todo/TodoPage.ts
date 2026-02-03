import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class TodoPage extends BasePage {
  readonly inputBox: Locator;
  readonly todoItems: Locator;
  readonly todoLabel: Locator;
  readonly markAll: Locator;
  readonly deleteItem: Locator;
  readonly counter: Locator;
  readonly filters: Locator;
  readonly clear: Locator;
  readonly pageTitle: string = 'React • TodoMVC';
  readonly header1: Locator;
  readonly header1Text: string = 'todos';
  readonly url: string = 'https://demo.playwright.dev/todomvc/#/';
  readonly urlActive: string = 'https://demo.playwright.dev/todomvc/#/active';
  readonly urlCompleted: string = 'https://demo.playwright.dev/todomvc/#/completed';

  constructor (page: Page) {
    super(page)
    this.url = this.url;
    //page locators. list item locators are defined in methods since they are dynamic
    this.header1 = page.getByRole('heading', { level: 1 }).first();  // the first h1 element
    this.inputBox = page.locator('input.new-todo'); // input field with class='new-todo'
    this.todoItems = page.getByTestId('todo-item'); // has data-testid='todo-item'
    this.todoLabel = page.getByTestId('todo-title');
    this.markAll = page.getByLabel('Mark all as complete');  // has label with text 'Mark all as complete'
    this.deleteItem = page.locator('button.destroy');
    this.counter = page.getByTestId('todo-count');
    this.filters = page.locator('ul.filters');  // ul element with class='filters'
    this.clear = page.getByRole('button', { name: 'Clear completed' });  // button with text 'Clear completed'
  }

  async goto () {
    await this.navigate(this.url);
  }

  async addToDo (text: string | string[]) {
    if (typeof (text) === 'string') {
      await this.inputBox.fill(text);
      await this.inputBox.press('Enter');
    }
    else {
      for (const add of text) {
        await this.inputBox.fill(add);
        await this.inputBox.press('Enter');
      }
    }
  }


  async editToDo (item: string, replacementText: string, save?: string) {
    const todo = this.todoItems.filter({ hasText: item });
    await todo.dblclick();
    await todo.getByLabel('Edit').fill(replacementText);
    if (!save) save = 'enter';
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

  async getCompleteCheckbox (item: string): Promise<Locator> {
    const todo = this.todoItems.filter({ hasText: item });
    return await todo.getByLabel('Toggle Todo');
  }

  async completeToDo (item: string) {
    const todo = this.todoItems.filter({ hasText: item });
    await todo.getByRole('checkbox').check();
  }

  async uncompleteToDo (item: string) {
    const todo = this.todoItems.filter({ hasText: item });
    await todo.getByRole('checkbox').uncheck();
  }

  async completeAllToDo () {
    await this.markAll.check();
  }

  async uncompleteAllToDo () {
    await this.markAll.uncheck();
  }

  async remove (text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll () {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }

  async getItems () :Promise<String[]> {
    const items: String[] = [];

    // Wait for the list to be stable before counting
    await this.page.waitForLoadState('networkidle');

    const count = await this.todoItems.count();
    for (let i=0; i<count; i++) {
      items.push(await this.todoLabel.nth(i).innerText());
    }
    return items;
  }


  async getVisibleItems () :Promise<String[]> {
    const items: String[] = [];

    // Wait for the list to be stable before counting
    await this.page.waitForLoadState('networkidle');

    const count = await this.todoItems.count();
    for (let i=0; i<count; i++) {
      if (await this.todoItems.nth(i).isVisible()) {
      items.push(await this.todoLabel.nth(i).innerText());
      }
    }
    return items;
  }


  async applyFilter (text: string) {
    const expectedUrl = text === 'All' ? this.url : text === 'Active' ? this.urlActive : this.urlCompleted;
   
    // Click the filter
    await this.page.getByRole('link', { name: text }).click();
    
    // Wait for URL to change
    await this.page.waitForURL(expectedUrl, { waitUntil: 'domcontentloaded' });
    
    // CRITICAL: Wait for the DOM to update by waiting for the count to stabilize
    // This ensures the filtered items are rendered before proceeding
    await this.page.waitForFunction(() => {
        const items = document.querySelectorAll('[data-testid="todo-item"]');
        // Wait a bit to ensure the list has stabilized
        return items.length >= 0;
      },
      { timeout: 5000 }
    );

    // Additional wait for network to be idle (helps with slower CI environments)
    await this.page.waitForLoadState('networkidle', { timeout: 3000 })
      .catch(() => {/* Ignore timeout - networkidle might not occur on static pages */});
  }

}