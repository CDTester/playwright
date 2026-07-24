import { test, expect } from '@playwright/test';
import { RandomCardPage } from '../../pages/Random/RandomCardPage';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('RAND-001', 'BUG-501', 'CRITICAL');
const annotation2 = testAnnotation('RAND-002', 'BUG-502', 'NORMAL');
const annotation3 = testAnnotation('RAND-003', 'BUG-503', 'MINOR');

test.describe('Random order Cards Tests', {tag: ['@random']}, () => {

  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Random');
    await allure.feature('Feature: Random delayed order Tests');
    await allure.owner('Chris');
  });

  test('Wait for all product cards to be displayed', 
  {annotation: annotation1 , tag: ['@smoke'] }, async ({page}) => {
    const randomCardPage = new RandomCardPage(page);

    await allure.story('Story: Page loads all cards in random order');
    await allure.tms('RAND-001');
    await allure.issue('BUG-501');
    await allure.severity(allure.Severity.CRITICAL);

    await test.step('GIVEN I navigate to the Random Order page', async () => {
      await randomCardPage.goto();
    });

    await test.step('WHEN the header is displayed', async () => {
      await expect(randomCardPage.header).toBeVisible();
    });

    await test.step('THEN all the product cards should be displayed in a random timing', async () => {
      expect(await randomCardPage.waitForAllCards()).toBe(true);
    });
  });

  test('Get the random pice for a monitor',
  {annotation: annotation2 , tag: ['@regression'] }, async ({page}) => {
    const randomCardPage = new RandomCardPage(page);

    await allure.story('Story: Product price is to be displayed');
    await allure.tms('RAND-002');
    await allure.issue('BUG-502');
    await allure.severity(allure.Severity.NORMAL);

    await test.step('GIVEN I navigate to the Random Order page', async () => {
      await randomCardPage.goto();
    });

    await test.step('WHEN the product card for monitor is displayed', async () => {
      await expect(randomCardPage.monitorCard).toBeVisible();
    });

    await test.step('THEN get the random price', async () => {
      const price = await randomCardPage.getPrice(randomCardPage.monitorCard);
      expect(price, `${price} should not be £0.00`).not.toBe('£0.00');

      //or 
      await expect(randomCardPage.productPrice(randomCardPage.monitorCard), `${price} should not be £0.00`).not.toContainText('£0.00')
    });
  });

  test('Add Printer to the basket',
  {annotation: annotation3 , tag: ['@regression'] }, async ({page}) => {
    const randomCardPage = new RandomCardPage(page);

    await allure.story('Story: Add product to basket');
    await allure.tms('RAND-003');
    await allure.issue('BUG-503');
    await allure.severity(allure.Severity.MINOR);

    await test.step('GIVEN I navigate to the Random Order page', async () => {
      await randomCardPage.goto();
    });

    await test.step('AND the product card for printer is displayed', async () => {
      await expect(randomCardPage.printerCard).toBeVisible();
    });

    await test.step('AND there are no items in the basket', async () => {
      const items = await randomCardPage.getNumberOfItemsInBasket();
      expect(items, `expected number of items ${items} to be 0`).toBe(0);
    });

    await test.step('WHEN the Add to Basket button is clicked', async () => {
      await randomCardPage.addToBasket(randomCardPage.printerCard);
    });

    await test.step('THEN the number of items in basket increments', async () => {
      const items = await randomCardPage.getNumberOfItemsInBasket();
      expect(items, `expected number of items ${items} to be 1`).toBe(1);
    });
  });

});