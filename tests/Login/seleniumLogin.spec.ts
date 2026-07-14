import { test, expect } from '@playwright/test';
import { SeleniumLoginPage } from '../../pages/Login/SeleniumLoginPage';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('LOGIN-001', 'BUG-101', 'BLOCKER');
const annotation2 = testAnnotation('LOGIN-002', 'BUG-102', 'CRITICAL');

test.describe('Selenium Login Page Tests', {tag: ['@login', '@selenium', '@noStorageState']}, () => {
  let login: SeleniumLoginPage;

  test.beforeEach(async ({page}) => {
    login = new SeleniumLoginPage(page);
    await allure.epic('Epic: Login');
    await allure.feature('Feature: Users API Tests');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${login.url} has loaded`, async () => {
      await test.step(`GIVEN ${login.url} has loaded`, async () => {
        await login.goto();
        await expect(page.locator('html')).toMatchAriaSnapshot(login.pageSnapshot);
      });
    });
  });

  test('Login with valid credentials', 
  {annotation: annotation1, tag: ['@smoke']}, async ({ page }) => {
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
      await test.step(`GIVEN user has valid credential`, async () => {});
    });

    await allure.step(`WHEN the user logs in`, async (step) => {
      step.parameter('Alert Message', message);
      await test.step(`WHEN the user logs in`, async () => {
        message = await login.login(username, password);
      });
    });

    await allure.step(`THEN a successful login message is presented`, async (step) => {
      await test.step(`THEN a successful login message is presented`, async () => {
        expect(message, `expect message to be "${login.successMessage}"`).toBe(login.successMessage);
      });
    });

  });

  test('Login with invalid credentials', 
  {annotation: annotation2, tag: ['@regression']}, async ({ page }) => {
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
      await test.step(`GIVEN user has invalid credential`, async () => {});
    });

    await allure.step(`WHEN the user logs in`, async (step) => {
      await test.step(`WHEN the user logs in`, async () => {
        message = await login.login(username, password);
      });
    });

    await allure.step(`THEN an error login message is presented`, async (step) => {
      await test.step(`THEN an error login message is presented`, async () => {
        expect(message, `expect message to be "${login.errorMessage}"`).toBe(login.errorMessage);
      });
    });

  });
});