import { Page, Locator, expect, WebSocket } from '@playwright/test';
import { BasePage } from '../BasePage';

export class RouteWebSocketPage extends BasePage {
  readonly url: string;
  readonly pauseMessaging: Locator;
  readonly resumeMessaging: Locator;
  readonly websocketConnectButton: Locator;
  readonly websocketDisconnectButton: Locator;
  readonly MessageInput: Locator;
  readonly MessageSendButton: Locator;
  readonly onScreenMessages: Locator;

  constructor (page: Page, envData: any) {
    super(page);
    this.env = envData['echoWebSocket'];
    this.page = page;
    this.url=this.env.baseUrl;
    this.pauseMessaging = this.page.getByRole('button', { name: 'Pause Messaging' });
    this.resumeMessaging = this.page.getByRole('button', { name: 'Resume Messaging' });
    this.websocketConnectButton = this.page.getByRole('button', { name: 'Connect to Server' });
    this.websocketDisconnectButton = this.page.getByRole('button', { name: 'Disconnect from Server' });
    this.MessageInput = this.page.locator('#content');
    this.MessageSendButton = this.page.getByRole('button', { name: 'Send Message' });
    this.onScreenMessages = this.page.locator('#console div');
  }

  async goto () {
    await this.navigate(this.url);
    await this.page.waitForLoadState('load'); // or 'domcontentloaded'
  }

  async mockResponseMessages (messageToListenFor: string, messageToSend: string[]) {
    // what about page.routeWebsocket to intercept the websocket connection and mock the response?
    await this.page.routeWebSocket(/echo.websocket.org/, ws => {
      console.log(`WebSocket opened: ${ws.url()}`);

      ws.send('Welcome!');

      ws.onMessage(message => {
        console.log(`WebSocket message received: ${message}`);
        if (message === messageToListenFor) {
          messageToSend.forEach(msg => ws.send(msg));
        }
      });
    });
  };

  async interceptMessages (messageToListenFor: string) {
    // what about page.routeWebsocket to intercept the websocket connection and mock the response?
    await this.page.routeWebSocket(/echo.websocket.org/, ws => {
      console.log(`WebSocket opened: ${ws.url()}`);
      const server = ws.connectToServer();

      server.onMessage(message => {
        console.log(`WebSocket message received: ${message}`);
        if (message === messageToListenFor) {
          ws.send(`Intercepted: ${messageToListenFor}`);
        }
        else {
          ws.send(message);
        }
      });
    });
  };

  async disconnectToWebSocket() {
    await expect.soft(this.websocketDisconnectButton).toBeVisible();
    await this.websocketDisconnectButton.click();
    await expect.soft(this.websocketConnectButton).toBeVisible();
  }

  async pauseWebSocket() {
    await expect.soft(this.pauseMessaging).toBeVisible();
    await this.pauseMessaging.click();
    await expect.soft(this.resumeMessaging).toBeVisible();
  }

  async resumeWebSocket() {
    await expect.soft(this.resumeMessaging).toBeVisible();
    await this.resumeMessaging.click();
    await expect.soft(this.pauseMessaging).toBeVisible();
  }

  async sendMessage(message: string) {
    await this.MessageInput.fill(message);
    await this.MessageSendButton.click();
  }

  async readOnScreenMessages(): Promise<string[]> {
    return await this.onScreenMessages.allTextContents();
  }


}