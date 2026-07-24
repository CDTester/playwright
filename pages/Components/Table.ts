import { Page, Locator, expect } from '@playwright/test';

export class Table {
  readonly tableLocator: Locator;
  readonly rows: Locator;

  constructor(private readonly page: Page, table: Locator, private readonly columns: Record<string, number>) {
    this.tableLocator = table;
    this.rows = table.getByRole('row').filter({ hasNot: page.getByRole('columnheader') });
  }

  /** Returns a single row locator by its zero-based index, ignores rowheader */
  getRow(index: number): Locator {
    return this.rows.nth(index);
  }

  /** Returns total number of data rows currently in the table, ignores row header */
  async getRowCount(): Promise<number> {
    return this.rows.count();
  }

  /** Returns the current header text values from the table */
  async getHeaders(): Promise<string[]> {
    return this.tableLocator.getByRole('columnheader').allInnerTexts();
  }

  /**
   * Returns a Locator for the row containing all given cell values.
   * Matches zero elements if no row satisfies all values (caller can assert/count as needed).
   */
  getRowLocatorByCellValues(...cellValues: string[]): Locator {
    const row: Locator = cellValues.reduce(
      (row, value) => row.filter({ has: this.page.getByRole('cell', { name: value, exact: true }) }),
      this.rows
    );
    return row;
  }

  /** Gets the row index from the value inside the cell of chosen column  */
  async getRowIndexByCellValue(column: keyof typeof this.columns, cellValue: string): Promise<number> {
    const count = await this.rows.count();
    for (let index = 0; index < count; index++) {
      const text = await this.getRow(index).getByRole('cell').nth(this.columns[column]).innerText();
      if (text === cellValue) {
        return index;
      }
    }
    return -1; // not found - explicit, no ambiguity with real errors
  }

  /** Gets text of a specific cell by row index + column name, ignores rowheader */
  async getCellText(rowIndex: number, column: keyof typeof this.columns): Promise<string> {
    const row = this.getRow(rowIndex);
    const cell = row.getByRole('cell').nth(this.columns[column]);
    return (await cell.innerText()).trim();
  }

  async getColumnValues(column: string): Promise<string[]> {
    const count = await this.getRowCount();
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      values.push(await this.getCellText(i, column));
    }
    return values;
  }
}
