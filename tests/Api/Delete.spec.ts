import { test, expect, APIResponse } from '../../fixtures/apiFixture';
import * as allure from "allure-js-commons";

test.describe('Posts API', {tag: ['@api', '@posts', '@delete']}, () => {
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: DELETE API Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async ({ postsApi }) => {
    await postsApi.dispose();
  });

  test('DELETE an existing post', {tag: ['@smoke']}, async ({ postsApi }) => {
    await allure.story('Story: Delete an existing post');
    await allure.tms('USER-011');
    await allure.issue('BUG-011');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the posts API can be connected to', async (step) => {
      await postsApi.init();
      await step.parameter('base URL', postsApi.getBaseUrl);
    });

    await allure.step('WHEN a request is made to delete an existing post', async () => {
      response = await postsApi.deletePost('1');
      respBody = await response.json();
    });

    await allure.step('THEN the response code should be 200', async (step) => {
      await step.parameter('response Status', `${response.status} ${response.statusText()}`);
      expect(response.status(), 'Expected status code 200').toBe(200);
    });

  });


});