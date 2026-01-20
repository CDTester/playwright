import { test, expect } from '@playwright/test';
import { SeleniumLoginPage } from '../../pages/Login/SeleniumLoginPage';
import * as allure from "allure-js-commons";

test.describe('Selenium Login Page Tests', {tag: ['@login', '@selenium', '@noStorageState']}, () => {
  let login: SeleniumLoginPage;

  test.beforeEach(async ({page}) => {
    login = new SeleniumLoginPage(page);
    await allure.epic('Epic: Login');
    await allure.feature('Feature: Users API Tests');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${login.url} has loaded`, async () => {
      await login.goto();
      await expect(page.locator('html')).toMatchAriaSnapshot(login.pageSnapshot);
    });
  });

  test('Login with valid credentials', async ({ page }) => {
    await allure.story('Story: Login in to Selenium');
    await allure.tms('LOGIN-001');
    await allure.issue('BUG-101');
    await allure.severity(allure.Severity.BLOCKER);

    const username = 'username';
    const password = 'password';
    let message: string = '';
    
    await allure.step(`GIVEN user has valid credential`, async (step) => {
      await step.parameter('Username', username);
      await step.parameter('Password', password);
    });

    await allure.step(`WHEN the user logs in`, async (step) => {
      message = await login.login(username, password);
      step.parameter('Alert Message', message);
    });

    await allure.step(`THEN a successful login message is presented`, async (step) => {
      expect(message, `expect message to be "${login.successMessage}"`).toBe(login.successMessage);
    });

  });


  test('Login with invalid credentials', async ({ page }) => {
    await allure.story('Story: Login in to Selenium');
    await allure.tms('LOGIN-002');
    await allure.issue('BUG-102');
    await allure.severity(allure.Severity.CRITICAL);

    const username = 'username';
    const password = 'not_my_password';
    let message: string = '';
    
    await allure.step(`GIVEN user has invalid credential`, async (step) => {
      await step.parameter('Username', username);
      await step.parameter('Password', password);
    });

    await allure.step(`WHEN the user logs in`, async (step) => {
      message = await login.login(username, password);
      step.parameter('Alert Message', message);
    });

    await allure.step(`THEN an error login message is presented`, async (step) => {
      expect(message, `expect message to be "${login.errorMessage}"`).toBe(login.errorMessage);
    });

  });


});