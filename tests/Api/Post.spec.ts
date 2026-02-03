import { test, expect, APIResponse } from '@playwright/test';
import { PostsApi } from '../../pages/Api/Jsonplaceholder/PostsApi';
import * as allure from "allure-js-commons";

test.describe('Posts API', {tag: ['@api', '@posts', '@post']}, () => {
  let api: PostsApi;
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    api = new PostsApi();
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: POST API Tests');
    await allure.owner('Chris');
  });

  test.afterEach(async () => {
    await api.dispose();
  });

  test('POST a new post', {tag: ['@smoke']}, async () => {
    await allure.story('Story: Create a new post');
    await allure.tms('USER-008');
    await allure.issue('BUG-008');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the posts API can be connected to', async (step) => {
      await api.init();
      await step.parameter('base URL', api.getBaseUrl);
    });

    await allure.step('WHEN a request is made to create a new post', async (step) => {
      const data = {
        title: 'POST a new post',
        body: 'this is the body of the new post',
        userId: 1
      };
      response = await api.createPost(data);
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