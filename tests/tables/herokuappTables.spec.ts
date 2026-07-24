import { test, expect } from '../../fixtures/loginHerokuappFixture';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('TABLE-001', 'BUG-701', 'BLOCKER');
const annotation2 = testAnnotation('TABLE-002', 'BUG-702', 'CRITICAL');
const annotation3 = testAnnotation('TABLE-003', 'BUG-703', 'NORMAL');

test.describe('The-internet.herokuapp Challenging DOM Page Tests', {tag: ['@tables']}, () => {

  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Tables');
    await allure.feature('Feature: Table Tests');
    await allure.owner('Chris');
  });

  test('Confirm table headers and verify data in table cells', 
  {annotation: annotation1, tag: ['@smoke']}, async ({ tablesPage }) => {
    await allure.story('Story: Access the-internet.herokuapp Tables');
    await allure.tms('TABLE-001');
    await allure.issue('BUG-701');
    await allure.severity(allure.Severity.BLOCKER);

    await test.step(`GIVEN the challenging DOM page has loaded`, async () => {
      await tablesPage.goto();
    });

    await test.step(`WHEN the table is visible`, async () => {
      await expect(tablesPage.table.tableLocator).toBeVisible();
    });

    await test.step(`THEN the table must have column headers`, async () => {
      const headers: string[] = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Diceret', 'Action'];
      expect(await tablesPage.table.getHeaders(),
        `Verify table has these column headers: ${headers.toString()}`)
        .toStrictEqual(headers);
    });

    await test.step(`AND there are 10 rows`, async () => {
      expect(await tablesPage.table.getRowCount(), `Expect there to be 10 rows`).toBe(10);
    });

    await test.step(`AND verify the data in row 5`, async () => {
      const expectRow: string = 'Iuvaret4 Apeirian4 Adipisci4 Definiebas4 Consequuntur4 Phaedrum4 edit delete';

      await expect(tablesPage.table.getRow(4), `Expect row 5 to have values: ${expectRow}`).toHaveText(expectRow);
    });

    await test.step(`AND you can find a row based on one or many column values`, async () => {
      const expectValues: string[] = ['Iuvaret7', 'Definiebas7'];
      const rows = tablesPage.table.getRowLocatorByCellValues(...expectValues);
      await expect(await rows, `Expect row 7 to have values: ${expectValues[0]}`).toContainText(expectValues[0]);
      await expect(await rows, `Expect row 7 to have values: ${expectValues[1]}`).toContainText(expectValues[1]);
    });

    await test.step(`AND you can get the row index by a value from a specific column`, async () => {
      expect(await tablesPage.table.getRowIndexByCellValue('Amet', 'Consequuntur2'), `Expect row 2 to have value Consequuntur2 in columm Amet`)
        .toBe(2);
    });

    await test.step(`AND you can get the values of a cell by column and row index`, async () => {
      expect(await tablesPage.table.getCellText(9, 'Sit'), `Expect row 9 to have value Definiebas9 in columm Sit`)
        .toBe('Definiebas9');
    });

    await test.step(`AND you can get all the values in a column`, async () => {
      const expectedValues: string[] = ['Adipisci0', 'Adipisci1', 'Adipisci2', 'Adipisci3', 'Adipisci4', 'Adipisci5', 'Adipisci6', 'Adipisci7', 'Adipisci8', 'Adipisci9'];
      expect(await tablesPage.table.getColumnValues('Dolor'), `Expect column Dolor to have values ${expectedValues}`)
        .toStrictEqual(expectedValues);
    });
  });

  test('Can edit a row', 
  {annotation: annotation2, tag: ['@regression']}, async ({ tablesPage }) => {
    await allure.story('Story: Can edit a row in the table');
    await allure.tms('TABLE-002');
    await allure.issue('BUG-702');
    await allure.severity(allure.Severity.CRITICAL);

    await test.step(`GIVEN the challenging DOM page has loaded`, async () => {
      await tablesPage.goto();
    });

    await test.step(`WHEN table is visible`, async (step) => {
      await expect(tablesPage.table.tableLocator).toBeVisible();
    });

    await test.step(`THEN the edit row link can be clicked`, async () => {
      await tablesPage.editRow('Amet', 'Consequuntur3');
      expect(await tablesPage.page, `Expect URL to be ${tablesPage.url}#edit`).toHaveURL(`${tablesPage.url}#edit`);
    });

  });

  test('Can delete a row', 
  {annotation: annotation3, tag: ['@regression']}, async ({ tablesPage }) => {
    await allure.story('Story: Can delete a row in the table');
    await allure.tms('TABLE-003');
    await allure.issue('BUG-703');
    await allure.severity(allure.Severity.CRITICAL);

    await test.step(`GIVEN the challenging DOM page has loaded`, async () => {
      await tablesPage.goto();
    });

    await test.step(`WHEN table is visible`, async (step) => {
      await expect(tablesPage.table.tableLocator).toBeVisible();
    });

    await test.step(`THEN the delete row link can be clicked`, async () => {
      await tablesPage.deleteRow('Amet', 'Consequuntur3');
      expect(await tablesPage.page, `Expect URL to be ${tablesPage.url}#delete`).toHaveURL(`${tablesPage.url}#delete`);
    });

  });

});
