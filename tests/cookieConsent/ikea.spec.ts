import { test, expect } from '../../fixtures/cookiesFixture';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('COOK-001', 'BUG-401', 'CRITICAL');

test.describe('Cookie Consent Tests', {tag: ['@cookie']}, () => {

  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Cookies');
    await allure.feature('Feature: Cookie Consent Tests');
    await allure.owner('Chris');
  });

  test('intercept websocket messages', {annotation: annotation1 , tag: ['@smoke'] }, async ({ikeaHomePage}) => {
    await allure.story('Story: Send and receive messages on a websocket');
    await allure.tms('COOK-001');
    await allure.issue('BUG-401');
    await allure.severity(allure.Severity.CRITICAL);

    await test.step('GIVEN I navigate to the Ikea homepage', async () => {
      await ikeaHomePage.goto();
    });

    await test.step('WHEN the cookie consent is displayed', async () => {
      await ikeaHomePage.rejectCookieConsent();
    });

    await test.step('THEN the locator handler in the goto function rejects the cookie consent', async () => {
      await expect(ikeaHomePage.cookieConsentHeader).not.toBeVisible();
    });

  });
});