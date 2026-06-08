import { test, expect, APIResponse } from '../../fixtures/apiFixture';
import * as allure from "allure-js-commons";

test.describe('Posts API', {tag: ['@api', '@posts', '@post']}, () => {
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: POST API Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async ({ postsApi }) => {
    await postsApi.dispose();
  });

  test('POST a new post', {tag: ['@smoke']}, async ({ postsApi }) => {
    await allure.story('Story: Create a new post');
    await allure.tms('USER-008');
    await allure.issue('BUG-008');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the posts API can be connected to', async (step) => {
      await step.parameter('base URL', postsApi.baseURL);
    });

    await allure.step('WHEN a request is made to create a new post', async () => {
      const data:object = {
        title: 'POST a new post',
        body: 'this is the body of the new post',
        userId: 1
      };
      response = await postsApi.createPost(data);
      respBody = await response.json();
    });

    await allure.step('THEN the response code should be 201', async (step) => {
      await step.parameter('response Status', `${response.status} ${response.statusText()}`);
      expect(response.status(), 'Expected status code 201').toBe(201);
    });

    await allure.step('AND the response body contains the posted data', async (step) => {
      await step.parameter('response body', JSON.stringify(respBody, null, 2));
      expect(respBody, 'Expected response body to not be undefined').toBeDefined();
      expect(respBody.title, 'Expected title to be POST a new post').toBe('POST a new post');
      expect(respBody.body, 'Expected body to be this is the body of the new post').toBe('this is the body of the new post');
      expect(respBody.userId, 'Expected userId to be 1').toBe(1);
    });
  });


});