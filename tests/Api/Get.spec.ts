import { test, expect, APIResponse } from '../../fixtures/apiFixture';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('USER-001', 'BUG-001', 'NORMAL');
const annotation2 = testAnnotation('USER-002', 'BUG-002', 'NORMAL');
const annotation3 = testAnnotation('USER-003', 'BUG-003', 'NORMAL');
const annotation4 = testAnnotation('USER-004', 'BUG-004', 'NORMAL');

test.describe('User API', {tag: ['@api', '@users', '@get']}, () => {
  test.beforeEach(async () => {
    // The 'request' fixture automatically uses baseURL from config
    await allure.epic('Epic: API tests');
    await allure.feature('Feature: GET API Tests');
    await allure.owner('Chris');
  });

  // test.afterEach(async ({ usersApi }) => {
  //   await usersApi.dispose();
  // });

  test('Get all users', 
  {annotation: annotation1, tag: ['@smoke']}, async ({ usersApi }) => {
    await allure.story('Story: Get users');
    await allure.tms('USER-001');
    await allure.issue('BUG-001');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the users API can be connected to', async (step) => {
      await step.parameter('base URL', usersApi.baseURL);
    });

    await allure.step('WHEN a request is made to get all users', async () => {
      response = await usersApi.getAllUsers();
      respBody = await response.json();
    });

    await allure.step('THEN the response code should be 200', async (step) => {
      await step.parameter('response Status', `${response.status} ${response.statusText()}`);
      expect(response.status(), 'Expected status code 200').toBe(200);
    });

    await allure.step('AND the response body is not empty', async (step) => {
      await step.parameter('number of users', `${respBody.length}`);
      expect(respBody, 'Expected response body to not be undefined').toBeDefined();
      expect(respBody.length, 'Expected response body to have a length greater than 0').toBeGreaterThan(0);
    });
  });


  test('Get user by id', 
  {annotation: annotation2, tag: ['@smoke']}, async ({ usersApi }) => {
    await allure.story('Story: Get users');
    await allure.tms('USER-002');
    await allure.issue('BUG-002');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the users API can be connected to', async (step) => {
      await step.parameter('base URL', usersApi.baseURL);
    });

    await allure.step('WHEN a request is made to get a user by id', async () => {
      response = (await usersApi.getUserById('1')) as APIResponse;
      respBody = await response.json();
    });

    await allure.step('THEN the response code should be 200', async (step) => {
      await step.parameter('response Status', `${response.status} ${response.statusText()}`);
      expect(response.status(), 'Expected status code 200').toBe(200);
    });

    await allure.step('AND the response body should contain details of the user', async (step) => {
      await step.parameter('response body', JSON.stringify(respBody, null, 2));
      expect(respBody, 'Expected response body to not be undefined').toBeDefined();
      expect(respBody.id, 'Expected user id to be 1').toBe(1);
    });
  });


  test('Get user by username', 
  {annotation: annotation3, tag: ['@smoke']}, async ({ usersApi }) => {
    await allure.story('Story: Get users');
    await allure.tms('USER-003');
    await allure.issue('BUG-003');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the users API can be connected to', async (step) => {
      await step.parameter('base URL', usersApi.baseURL);
    });

    await allure.step('WHEN a request is made to get a user by username', async (step) => {
      response = (await usersApi.getUserByUsername('Samantha')) as APIResponse;
      respBody = await response.json();
    });

    await allure.step('THEN the response code should be 200', async (step) => {
      await step.parameter('response Status', `${response.status} ${response.statusText()}`);
      expect(response.status(), 'Expected status code 200').toBe(200);
    });

    await allure.step('AND the response body should contain details of the user', async (step) => {
      await step.parameter('response body', JSON.stringify(respBody, null, 2));
      expect(respBody, 'Expected response body to not be undefined').toBeDefined();
      expect(respBody[0].username, 'Expected username to be Samantha').toBe('Samantha');
    });
  });


  test('Get user by city', 
  {annotation: annotation4, tag: ['@smoke']}, async ({ usersApi }) => {
    await allure.story('Story: Get users');
    await allure.tms('USER-004');
    await allure.issue('BUG-004');
    await allure.severity(allure.Severity.NORMAL);
    let response: APIResponse;
    let respBody: any;

    await allure.step('GIVEN the users API can be connected to', async (step) => {
      await step.parameter('base URL', usersApi.baseURL);
    });

    await allure.step('WHEN a request is made to get a user by city', async (step) => {
      response = (await usersApi.getUserByCity('South Elvis')) as APIResponse;
      respBody = await response.json();
    });

    await allure.step('THEN the response code should be 200', async (step) => {
      await step.parameter('response Status', `${response.status} ${response.statusText()}`);
      expect(response.status(), 'Expected status code 200').toBe(200);
    });

    await allure.step('AND the response body should contain details of the user', async (step) => {
      await step.parameter('response body', JSON.stringify(respBody, null, 2));
      expect(respBody, 'Expected response body to not be undefined').toBeDefined();
      expect(respBody[0].address.city, 'Expected city to be South Elvis').toBe('South Elvis');
    });
  });

});