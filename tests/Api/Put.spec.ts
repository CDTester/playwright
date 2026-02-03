import { test, expect, APIResponse } from '@playwright/test';
import { PostsApi } from '../../pages/Api/Jsonplaceholder/PostsApi';
import * as allure from "allure-js-commons";

test.describe('Posts API', {tag: ['@api', '@posts', '@put']}, () => {
  let api: PostsApi;
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    api = new PostsApi();
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: PUT API Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async () => {
    await api.dispose();
  });

  test('PUT an existing post', {tag: ['@smoke']}, async () => {
    await allure.story('Story: Update an existing post');
    await allure.tms('USER-009');
    await allure.issue('BUG-009');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the posts API can be connected to', async (step) => {
      await api.init();
      await step.parameter('base URL', api.getBaseUrl);
    });

    await allure.step('WHEN a request is made to update an existing post', async (step) => {
      const data = {
        id: 1,
        title: 'PUT an updated post',
        body: 'this is the updated body of the post',
        userId: 1
      };
      response = await api.updatePost('1', data);
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
      expect(respBody.title, 'Expected title to be PUT an updated post').toBe('PUT an updated post');
      expect(respBody.body, 'Expected body to be this is the updated body of the post').toBe('this is the updated body of the post');
      expect(respBody.userId, 'Expected userId to be 1').toBe(1);
    });
  });


});