import { test, expect } from '@playwright/test';

test('intercept websocket messages', async ({ page }) => {
  const wsMessages: string[] = [];
  const messageToSend = 'Hello WebSocket!';

  // Listen for WebSocket connections the page makes
  page.on('websocket', ws => {
    console.log(`WebSocket opened: ${ws.url()}`);

    ws.on('framesent', frame => wsMessages.push(`SENT: ${frame.payload.toString()}`));
    ws.on('framesent', frame => console.log(`SENT: ${frame.payload.toString()}`));
    ws.on('framereceived', frame => wsMessages.push(`RECEIVED: ${frame.payload.toString()}`));
    ws.on('framereceived', frame => console.log(`RECEIVED: ${frame.payload.toString()}`));
    ws.on('close', () => console.log('WebSocket closed'));
  });

  await test.step('Navigate to the websocket tester page', async () => {
    await page.goto('https://tests.ws/tools/websocket-tester');
    
    // Decline cookies if prompted
    await page.getByRole('button', { name: 'Do not consent' }).click();
    await expect(page.getByRole('button', { name: 'Privacy and cookie settings' })).toBeVisible();
  });

  await test.step('Connect to the WebSocket tester', async () => {
    await page.getByRole('button', { name: 'Connect' }).click();
  });

  await test.step('Send a message on the websocket', async () => {
    await page.getByRole('textbox', { name: 'Type a message... (Enter to' }).click();
    await page.getByRole('textbox', { name: 'Type a message... (Enter to' }).fill(messageToSend);
    await page.getByRole('button', { name: 'Send' }).click();
  });


  await test.step('Websocket should have sent the message', async () => {
    expect(wsMessages).toContain(`SENT: ${messageToSend}`);
  });

  await test.step('Websocket should have received the message', async () => {
    expect(wsMessages).toContain(`RECEIVED: ${messageToSend}`);
  });

  await test.step('Disconnect from the WebSocket', async () => {
    await expect.soft(page.getByRole('button', { name: 'Disconnect' })).toBeVisible();
    await page.getByRole('button', { name: 'Disconnect' }).click();
  });


});