import { test, expect } from '../../fixtures/pageFixture';
import * as allure from "allure-js-commons";

test.describe('Websockets Page Tests', {tag: ['@websocket']}, () => {

  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Websockets');
    await allure.feature('Feature: Websocket Tests');
    await allure.owner('Chris');
  });

  test('Send websocket messages via UI',
  {annotation: [
    { type: 'TMS', description: 'https://tms.example.com/testcase/SOCK-002' },
    { type: 'BUGS', description: 'https://issue-tracker.example.com/issue/BUG-202' },
    { type: 'SEVERITY', description: 'BLOCKER' }]
  }, async ({routeWebSocketPage}) => {
    await allure.story('Story: Send and receive messages on a websocket');
    await allure.tms('SOCK-002');
    await allure.issue('BUG-202');
    await allure.severity(allure.Severity.BLOCKER);

    const messageToSend = 'Hello chatbot';

    await test.step('GIVEN I navigate to the websocket tester page', async () => {
      await routeWebSocketPage.goto();
    });

    await test.step('AND I pause messaging', async () => {
      await routeWebSocketPage.pauseWebSocket();
    });

    await test.step('WHEN I send a message on the websocket', async () => {
      await routeWebSocketPage.sendMessage(messageToSend);
    });

    await test.step('THEN the displayed messages should contain the sent message', async () => {
      await expect(routeWebSocketPage.onScreenMessages).toHaveText([
        'attempting to connect',
        'connected',
        /Request served by/,
        'paused messages',
        messageToSend,
        messageToSend
      ]);

      await routeWebSocketPage.takeScreenshot(true, 'websocket-messages-sent');
    });

  });

  test('Mock websocket response messages',
  {annotation: [
    { type: 'TMS', description: 'https://tms.example.com/testcase/SOCK-003' },
    { type: 'BUGS', description: 'https://issue-tracker.example.com/issue/BUG-203' },
    { type: 'SEVERITY', description: 'BLOCKER' }]
  }, async ({routeWebSocketPage}) => {
    await allure.story('Story: Send and receive messages on a websocket');
    await allure.tms('SOCK-003');
    await allure.issue('BUG-203');
    await allure.severity(allure.Severity.BLOCKER);

    const messageToListenFor = 'Hello chatbot';
    const messageToSend = ['Hi friend', 'How can I help you today?'];

    await test.step('GIVEN I navigate to the websocket tester page', async () => {
      await routeWebSocketPage.mockResponseMessages(messageToListenFor, messageToSend);
      await routeWebSocketPage.goto();
    });

    await test.step('AND I pause messaging', async () => {
      await routeWebSocketPage.pauseWebSocket();
    });

    await test.step('WHEN I send a message on the websocket', async () => {
      await routeWebSocketPage.sendMessage(messageToListenFor);
    });

    await test.step('THEN the displayed messages should contain the sent message', async () => {
      await expect(routeWebSocketPage.onScreenMessages).toHaveText([
        'attempting to connect',
        'connected',
        'Welcome!',
        'paused messages',
        messageToListenFor,
        ...messageToSend
      ]);

      await routeWebSocketPage.takeScreenshot(true, 'websocket-messages-sent');
    });

  });

  test('Intercept websocket response messages',
  {annotation: [
    { type: 'TMS', description: 'https://tms.example.com/testcase/SOCK-004' },
    { type: 'BUGS', description: 'https://issue-tracker.example.com/issue/BUG-204' },
    { type: 'SEVERITY', description: 'BLOCKER' }]
  }, async ({routeWebSocketPage}) => {
    await allure.story('Story: Send and receive messages on a websocket');
    await allure.tms('SOCK-004');
    await allure.issue('BUG-204');
    await allure.severity(allure.Severity.BLOCKER);

    const messageToListenFor = 'Hello chatbot';

    await test.step('GIVEN I navigate to the websocket tester page', async () => {
      await routeWebSocketPage.interceptMessages(messageToListenFor);
      await routeWebSocketPage.goto();
    });

    await test.step('AND I pause messaging', async () => {
      await routeWebSocketPage.pauseWebSocket();
    });

    await test.step('WHEN I send a message on the websocket to be intercepted', async () => {
      await routeWebSocketPage.sendMessage(messageToListenFor);
    });

    await test.step('AND I send a message on the websocket not to be intercepted', async () => {
      await routeWebSocketPage.sendMessage('Another message');
    });

    await test.step('THEN the displayed messages should contain the sent message', async () => {
      await expect(routeWebSocketPage.onScreenMessages).toHaveText([
        'attempting to connect',
        'connected',
        /Request served by/,
        'paused messages',
        messageToListenFor,
        `Intercepted: ${messageToListenFor}`,
        'Another message',
        'Another message'
      ]);

      await routeWebSocketPage.takeScreenshot(true, 'websocket-messages-sent');
    });

  });


});