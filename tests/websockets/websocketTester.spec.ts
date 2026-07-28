import { test, expect } from '../../fixtures/websocketFixture';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('SOCK-001', 'BUG-201', 'BLOCKER');

test.describe('Websockets Page Tests', {tag: ['@websocket']}, () => {

  test.beforeEach(async ({}) => {
    await allure.epic('Epic: Websockets');
    await allure.feature('Feature: Websocket Tests');
    await allure.owner('Chris');
  });

  test('intercept websocket messages',
  {annotation: annotation1 , tag: ['@smoke']}, async ({webSocketTesterPage}) => {
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
      await expect(webSocketTesterPage.getSentMessages(), `SENT message should contain: ${messageToSend}`).toContain(messageToSend);
    });

    await test.step('Websocket should have received the message', async () => {
      await webSocketTesterPage.waitForMessages(1,2);
      await expect(webSocketTesterPage.getReceivedMessages(), `RECEIVED messages should contain: ${messageToSend}`).toContain(messageToSend);
    });

    await test.step('Disconnect from the WebSocket', async () => {
      await webSocketTesterPage.disconnectToWebSocket();
    });

  });
});