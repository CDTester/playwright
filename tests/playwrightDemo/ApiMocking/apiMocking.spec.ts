import { test, expect } from '../../../fixtures/playwrightDemoFixture';
import { testAnnotation } from '../../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('MOCK-001', 'BUG-301', 'BLOCKER');

test.describe('API Mocking Page Tests', {tag: ['@apiMocking']}, () => {
  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Playwright Demo');
    await allure.feature('Feature: API Mocking Tests');
    await allure.owner('Chris');
  });

  test('Mock the API response for the fruits endpoint',
  {annotation: annotation1, tag: ['@smoke'] },  async ({ apiMockingPage }) => {
    await allure.story('Story: Mock the API response for the fruits endpoint');
    await allure.tms('MOCK-001');
    await allure.issue('BUG-301');
    await allure.severity(allure.Severity.BLOCKER);

    await test.step('GIVEN a mocked API response is loaded', async () => {
      const json: object[] = [
        { "name": "Strawberry", id: 3 },
        { "name": "Banana", id: 1 },
        { "name": "Tomato", id: 5 },
        { "name": "Pear", id: 4 },
        { "name": "Blackberry", id: 64 },
        { "name": "Kiwi", id: 66 },
        { "name": "Pineapple", id: 10 },
        { "name": "Passionfruit", id: 70 },
        { "name": "Orange", id: 2 },
        { "name": "Raspberry", id: 23 },
        { "name": "Watermelon", id: 25 },
        { "name": "Lemon", id: 26 },
        { "name": "Mango", id: 27 },
        { "name": "Blueberry", id: 33 },
        { "name": "Apple", id: 6 },
        { "name": "Melon", id: 41 },
        { "name": "Lime", id: 44 },
        { "name": "Chocolate", id: 118 }
      ];

      apiMockingPage.mockApiResponse(json, 200);
    });

    await test.step('WHEN I navigate to the API mocking page', async () => {
      await apiMockingPage.goto();
    });

    await test.step('THEN I should see the mocked API response', async () => {
      await expect(apiMockingPage.page.getByText('Strawberry')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Banana')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Tomato')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Pear')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Blackberry')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Kiwi')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Pineapple')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Passionfruit')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Orange')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Raspberry')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Watermelon')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Lemon')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Mango')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Blueberry')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Apple', { exact: true })).toBeVisible();
      await expect(apiMockingPage.page.getByText('Melon', { exact: true })).toBeVisible();
      await expect(apiMockingPage.page.getByText('Lime')).toBeVisible();
      await expect(apiMockingPage.page.getByText('Chocolate')).toBeVisible();

      await apiMockingPage.takeScreenshot(true, 'api-mocking-page');
    });
  });
});