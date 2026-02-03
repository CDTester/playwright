import { test, expect, APIResponse } from '@playwright/test';
import { UsersApi } from '../../pages/Api/Jsonplaceholder/UsersApi';
import * as allure from "allure-js-commons";

test.describe('Users API', {tag: ['@api', '@users']}, () => {
  let api: UsersApi;
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    api = new UsersApi();
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: Schema Validation Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async () => {
    await api.dispose();
  });


  test('Validate User JSON schema', {tag: ['@smoke', '@schema']}, async () => {
    await allure.story('Story: Get users');
    await allure.tms('USER-005');
    await allure.issue('BUG-005');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the users API can be connected to', async (step) => {
      await api.init();
      await step.parameter('base URL', api.getBaseUrl);
    });

    await allure.step('WHEN a request is made to get all users', async (step) => {
      response = await api.getAllUsers();
      respBody = await response.json();
    });

    await allure.step('THEN the JSON schema should be valid', async (step) => {
      step.parameter('schema', JSON.stringify(api.schemaUsers, null, 2));
      const validateSchema = await api.validateSchema(respBody, api.schemaUsers);
      expect.soft(validateSchema, 'Expected response body to match JSON schema').toBe(true);
    });

  });

});