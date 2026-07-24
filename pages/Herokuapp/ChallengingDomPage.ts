import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Table } from '../Components/Table'

export class ChallengingDomPage extends BasePage {
  readonly url: string;
  readonly blueButton: Locator;
  readonly redButton: Locator;
  readonly greenButton: Locator;
  readonly table: Table;

  // Map column names to their index for readability
  readonly columns = {
    Lorem: 0,
    Ipsum: 1,
    Dolor: 2,
    Sit: 3,
    Amet: 4,
    Diceret: 5,
  };

  constructor(page: Page, envData: Record<string, any>) {
    super(page);
    this.env = envData['herokuapp'];
    this.url = this.env.baseUrl + '/challenging_dom';
    this.blueButton = page.locator('//a[@class="button"]');  // name changes on refresh
    this.redButton = page.locator('//a[@class="button alert"]');  // name changes on refresh
    this.greenButton = page.locator('/a[@class="button success"]');  // name changes on refresh
    this.table = new Table(page, page.getByRole('table'), this.columns) //;
  }

  async goto() {
    await this.navigate(this.url);
  }

  /** Clicks the "edit" link in a given row (avoids relying on random class/id) */
  async editRow(column: keyof typeof this.columns, cellValue: string): Promise<void> {
    const row = await this.table.getRowIndexByCellValue(column, cellValue);
    if (row === -1) {
      throw new Error(`Cannot edit row: no row found where ${column} = "${cellValue}"`);
    }
    await this.table.getRow(row).getByRole('link', { name: 'edit' }).click();
  }

  /** Clicks the "delete" link in a given row */
  async deleteRow(column: keyof typeof this.columns, cellValue: string): Promise<void> {
    const row = await this.table.getRowIndexByCellValue(column, cellValue);
    if (row === -1) {
      throw new Error(`Cannot edit row: no row found where ${column} = "${cellValue}"`);
    }
    await this.table.getRow(row).getByRole('link', { name: 'delete' }).click();
  }


}