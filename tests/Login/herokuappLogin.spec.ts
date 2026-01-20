import { test, expect } from '../../fixtures/loginHerokuappFixture';
import * as allure from "allure-js-commons";

test.describe('The-internet.herokuapp Login Page Tests', {tag: ['@login', '@selenium', '@noStorageState']}, () => {

  test.beforeEach(async ({page, loginPage}) => {
    await allure.epic('Epic: Login');
    await allure.feature('Feature: StorageState Tests');
    await allure.owner('Chris');
  });


  test('Cannot access secure area without login', async ({ loginPage, securePage }) => {
    await allure.story('Story: Access the-internet.herokuapp Secure Area');
    await allure.tms('LOGIN-011');
    await allure.issue('BUG-111');
    await allure.severity(allure.Severity.BLOCKER);

    await allure.step(`GIVEN the user is not logged in`, async (step) => {
      await step.parameter('Logged in', "False");
    });

    await allure.step(`WHEN the user naviagates to the secure page`, async (step) => {
      await securePage.goto();
      await step.parameter('Url', securePage.page.url());
    });

    await allure.step(`THEN the user is redirected to the login page`, async (step) => {
      step.parameter('Current URL', loginPage.page.url());
      await expect(loginPage.page, "Verify user is redirected to login page").toHaveURL(loginPage.url);
    });

    await allure.step(`AND the user is presented with message to login`, async (step) => {
      const message = await loginPage.getMessage(loginPage.errorMessage);
      step.parameter('Expected Message', loginPage.errorMessage);
      await expect(message).toBeVisible();
    });
  });


  test('Can access secure area with valid login', async ({ loginPage, securePage, userData }) => {
    await allure.story('Story: Access the-internet.herokuapp Secure Area');
    await allure.tms('LOGIN-012');
    await allure.issue('BUG-112');
    await allure.severity(allure.Severity.CRITICAL);

    await allure.step(`GIVEN the user is not logged in`, async (step) => {
      await step.parameter('Logged in', "False");
    });

    await allure.step(`AND the user naviagates to the login page`, async (step) => {
      await loginPage.goto();
      step.parameter('Expected URL using loginPage', loginPage.page.url());
    });

    await allure.step(`WHEN the user logs in with valid credentials`, async (step) => {
      const username = userData.validUser.username;
      const password = userData.validUser.password;
      await loginPage.login(username, password);
    });

    await allure.step(`THEN the user is redirected to the secure page`, async (step) => {
      step.parameter('current URL', securePage.page.url());
      await expect(securePage.page, 'Expected URL to be secure page').toHaveURL(securePage.url);
      await expect(securePage.headerText).toBeVisible();
    });

    await allure.step(`AND the user is presented with message to login`, async (step) => {
      const message = await securePage.getMessage(securePage.loggedInMessage);
      step.parameter('Expected Message', securePage.loggedInMessage);
      await expect(message).toBeVisible();
    });
  });


  test('The user is redirected to the login page after logging out', async ({ loginPage, securePage, userData }) => {
    await allure.story('Story: Access the-internet.herokuapp Secure Area');
    await allure.tms('LOGIN-013');
    await allure.issue('BUG-113');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step(`GIVEN the user is logged in`, async (step) => {
      await loginPage.goto();
      await loginPage.login(userData.validUser.username, userData.validUser.password);
      await expect(securePage.page, 'Expected URL to be secure page').toHaveURL(securePage.url);
      step.parameter('Current URL', securePage.page.url());
      await step.parameter('Logged in', "True");
    });

    await allure.step(`WHEN the user clicks logout`, async (step) => {
      await securePage.logout();
    });

    await allure.step(`THEN the user is redirected to the login page`, async (step) => {
      step.parameter('Current URL', loginPage.page.url());
      await expect(loginPage.page).toHaveURL(loginPage.url);
    });

    await allure.step(`AND the user is presented with message of being logged out`, async (step) => {
      const message = await loginPage.getMessage(loginPage.loggedOutMessage);
      step.parameter('Expected Message', loginPage.loggedOutMessage);
      await expect(message).toBeVisible();
    });
  });


  test('The user can access the secure page when storage state is used', async ({ securePage, loggedInState }) => {
    await allure.story('Story: Access the-internet.herokuapp Secure Area');
    await allure.tms('LOGIN-014');
    await allure.issue('BUG-114');
    await allure.severity(allure.Severity.MINOR);

    await allure.step(`GIVEN the user is logged in via a saved session state`, async (step) => {
      await step.parameter('Logged in', "True");
      const state = await loggedInState.page.context().storageState();
      await step.parameter('Storage State', JSON.stringify(state, null, 2));
    });

    await allure.step(`WHEN the user goes to the secure page`, async (step) => {
      await loggedInState.goto();
    });

    await allure.step(`THEN the user is not redirected to the login page`, async (step) => {
      step.parameter('Current URL', loggedInState.page.url());
      await expect(loggedInState.page, 'Expected URL to be secure page').toHaveURL(securePage.url);
    });

    await allure.step(`AND the user is not presented with logged in message`, async (step) => {
      const message = await securePage.getMessage(securePage.loggedInMessage);
      step.parameter('Expected Message', 'The logged in message is not visible because the login screen calls /authenticate which post the message to the secure area');
      await expect(message).not.toBeVisible();
    });

  });

});