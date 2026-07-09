import { test, expect } from '../../fixtures/pageFixture';
import * as allure from "allure-js-commons";

test.describe('Websockets Page Tests', {tag: ['@websocket']}, () => {

  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Websockets');
    await allure.feature('Feature: Websocket Tests');
    await allure.owner('Chris');
  });

  test('intercept websocket messages',
  {annotation: [
    { type: 'TMS', description: 'https://tms.example.com/testcase/SOCK-001' },
    { type: 'BUGS', description: 'https://issue-tracker.example.com/issue/BUG-201' },
    { type: 'SEVERITY', description: 'BLOCKER' }]
  }, async ({webSocketTesterPage}) => {
    await allure.story('Story: Send and receive messages on a websocket');
    await allure.tms('SOCK-001');
    await allure.issue('BUG-201');
    await allure.severity(allure.Severity.BLOCKER);

    const messageToSend = 'Hello WebSocket!';

    await test.step('Navigate to the websocket tester page', async () => {
      await webSocketTesterPage.goto();
    });

    await test.step('Connect to the WebSocket tester', async () => {
      await webSocketTesterPage.connectToWebSocket();
    });

    await test.step('Send a message on the websocket', async () => {
      await webSocketTesterPage.sendMessage(messageToSend);
    });

    await test.step('Websocket should have sent the message', async () => {
      expect(webSocketTesterPage.getSentMessages()).toContain(messageToSend);
    });

    await test.step('Websocket should have received the message', async () => {
      expect(webSocketTesterPage.getReceivedMessages()).toContain(messageToSend);
    });

    await test.step('Disconnect from the WebSocket', async () => {
      await webSocketTesterPage.disconnectToWebSocket();
    });

  });
});