import { test, expect } from '../../fixtures/cookiesFixture';
import * as allure from "allure-js-commons";

test.describe('Cookie Consent Tests', {tag: ['@cookie']}, () => {

  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Cookies');
    await allure.feature('Feature: Cookie Consent Tests');
    await allure.owner('Chris');
  });

  test('intercept websocket messages',
  {annotation: [
    { type: 'TMS', description: 'https://tms.example.com/testcase/COOK-001' },
    { type: 'BUGS', description: 'https://issue-tracker.example.com/issue/BUG-401' },
    { type: 'SEVERITY', description: 'CRITICAL' }]
  }, async ({ikeaHomePage}) => {
    await allure.story('Story: Send and receive messages on a websocket');
    await allure.tms('COOK-001');
    await allure.issue('BUG-401');
    await allure.severity(allure.Severity.CRITICAL);


    await test.step('GIVEN I navigate to the Ikea homepage', async () => {
      await ikeaHomePage.goto();
    });

    await test.step('WHEN the cookie consent is displayed', async () => {
      await expect(ikeaHomePage.cookieConsentHeader).toBeVisible();
    });

    await test.step('THEN the locator handler in the goto function rejects the cookie consent', async () => {
      await expect(ikeaHomePage.cookieConsentHeader).not.toBeVisible();
    });

  });
});