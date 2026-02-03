import { test, expect, APIResponse } from '@playwright/test';
import { PostsApi } from '../../pages/Api/Jsonplaceholder/PostsApi';
import * as allure from "allure-js-commons";

test.describe('Posts API', {tag: ['@api', '@posts', '@patch']}, () => {
  let api: PostsApi;
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    api = new PostsApi();
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: PATCH API Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async () => {
    await api.dispose();
  });

  test('PATCH an existing post', {tag: ['@smoke']}, async () => {
    await allure.story('Story: Update an existing post');
    await allure.tms('USER-010');
    await allure.issue('BUG-010');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the posts API can be connected to', async (step) => {
      await api.init();
      await step.parameter('base URL', api.getBaseUrl);
    });

    await allure.step('WHEN a request is made to patch an existing post', async (step) => {
      const data = {
        title: 'PATCH an existing post'
      };
      response = await api.patchPost('1', data);
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