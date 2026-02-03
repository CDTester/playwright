import { test, expect, APIResponse } from '@playwright/test';
import { BitlyApi } from '../../pages/Api/Bitly/BitlyApi';
import { PostmanApi } from '../../pages/Api/Postman/PostmanApi';
import * as allure from "allure-js-commons";

test.describe('Bitly API', {tag: ['@api', '@auth']}, () => {
  let api: BitlyApi;
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    api = new BitlyApi();
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: Auth Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async () => {
    await api.dispose();
  });


  test('User gets 403 response with invalid Bearer token', {tag: ['@smoke', '@bearer']}, async () => {
    await allure.story('Story: authentication using Bearer token');
    await allure.tms('USER-006');
    await allure.issue('BUG-006');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;

    await allure.step('GIVEN the bitly API can be connected to', async (step) => {
      await api.init();
      await step.parameter('base URL', api.getBaseUrl);
    });

    await allure.step('WHEN a request is made to get user with an invalid Bearer token', async (step) => {
      response = await api.getUser();
    });

    await allure.step('THEN the user will receive a 403 forbidden response', async (step) => {
      expect(response.status(), `Expected status ${response.status()} to be 403`).toBe(403);
    });

  });

});
  
test.describe('Postman API', {tag: ['@api', '@auth']}, () => {
  let api: PostmanApi;
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    api = new PostmanApi();
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: Auth Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async () => {
    await api.dispose();
  });


  test('User gets 401 response with invalid X-API-Key token', {tag: ['@smoke', '@x-api-key']}, async () => {
    await allure.story('Story: authentication using X-API-Key token');
    await allure.tms('USER-007');
    await allure.issue('BUG-007');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;

    await allure.step('GIVEN the postman API can be connected to', async (step) => {
      await api.init();
      await step.parameter('base URL', api.getBaseUrl);
    });

    await allure.step('WHEN a request is made to get user with an invalid Bearer token', async (step) => {
      response = await api.getMe();
    });

    await allure.step('THEN the user will receive a 401 Unauthorized response', async (step) => {
      expect(response.status(), `Expected status ${response.status()} to be 401`).toBe(401);
    });

  });

});