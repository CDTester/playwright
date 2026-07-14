import { test, expect, APIResponse } from '../../fixtures/apiFixture';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('USER-010', 'BUG-010', 'NORMAL');

test.describe('Posts API', {tag: ['@api', '@posts', '@patch']}, () => {
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: PATCH API Tests');
    await allure.owner('Chris');
  });

  // test.afterEach(async ({ postsApi }) => {
  //   await postsApi.dispose();
  // });

  test('PATCH an existing post', 
  {annotation: annotation1, tag: ['@smoke']}, async ({ postsApi }) => {
    await allure.story('Story: Update an existing post');
    await allure.tms('USER-010');
    await allure.issue('BUG-010');
    await allure.severity(allure.Severity.NORMAL);

    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the posts API can be connected to', async (step) => {
      await step.parameter('base URL', postsApi.baseURL);
    });

    await allure.step('WHEN a request is made to patch an existing post', async () => {
      const data = { title: 'PATCH an existing post' };
      response = (await postsApi.patchPost('1', data)) as APIResponse;
      respBody = await response.json();
    });

    await allure.step('THEN the response code should be 200', async (step) => {
      await step.parameter('response Status', `${response.status} ${response.statusText()}`);
      expect(response.status(), 'Expected status code 200').toBe(200);
    });

    await allure.step('AND the response body contains the updated data', async (step) => {
      await step.parameter('response body', JSON.stringify(respBody, null, 2));
      expect(respBody, 'Expected response body to not be undefined').toBeDefined();
      expect(respBody.id, 'Expected id to be 1').toBe(1);
      expect(respBody.title, 'Expected title to be PATCH an existing post').toBe('PATCH an existing post');
      expect(respBody.userId, 'Expected userId to be 1').toBe(1);
    });
  });


});