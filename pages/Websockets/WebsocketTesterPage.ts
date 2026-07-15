import { Page, Locator, expect, WebSocket } from '@playwright/test';
import { BasePage } from '../BasePage';

export class WebSocketTesterPage extends BasePage {
  readonly url: string;
  readonly wsMessagesSent: string[];
  readonly wsMessagesReceived: string[];
  readonly cookieConsentHeader: Locator;
  readonly doNotConsentButton: Locator;
  readonly websocketConnectButton: Locator;
  readonly websocketDisconnectButton: Locator;
  readonly MessageInput: Locator;
  readonly MessageSendButton: Locator;

  constructor (page: Page, envData: any) {
    super(page);
    this.env = envData['testsWs'];
    this.page = page;
    this.url=`${this.env.baseUrl}/tools/websocket-tester`;
    this.wsMessagesSent = [];
    this.wsMessagesReceived = [];
    this.doNotConsentButton = this.page.getByRole('button', { name: 'Do not consent' });
    this.websocketConnectButton = this.page.getByRole('button', { name: 'Connect' });
    this.websocketDisconnectButton = this.page.getByRole('button', { name: 'Disconnect' });
    this.MessageInput = this.page.getByRole('textbox', { name: 'Type a message...' });
    this.MessageSendButton = this.page.getByRole('button', { name: 'Send' });
    this.cookieConsentHeader = this.page.getByRole('heading', { name: 'tests.ws asks for your consent to use your personal data for the following purposes:' });
  }

  async goto () {
    // what about page.routeWebsocket to intercept the websocket connection and mock the response?

    this.page.on('websocket', ws => {
      console.log(`WebSocket opened: ${ws.url()}`);

      ws.on('framesent', frame => this.wsMessagesSent.push(frame.payload.toString()));
      ws.on('framesent', frame => console.log(`SENT: ${frame.payload.toString()}`));
      ws.on('framereceived', frame => this.wsMessagesReceived.push(frame.payload.toString()));
      ws.on('framereceived', frame => console.log(`RECEIVED: ${frame.payload.toString()}`));
      ws.on('close', () => console.log('WebSocket closed'));
    });


    await this.page.routeWebSocket('/ws', ws => {
      console.log(`WebSocket opened: ${ws.url()}`);
      ws.onMessage(message => {
        console.log(`WebSocket message received: ${message}`);
        this.wsMessagesReceived.push(message.toString());
      });
      ws.onClose(() => {
        console.log('WebSocket closed');
      });
      ws.onMessage(message => {
        console.log(`WebSocket message sent: ${message}`);
        this.wsMessagesSent.push(message.toString());
      });
    });


    await this.page.addLocatorHandler(this.cookieConsentHeader, async () => {
      await this.doNotConsentButton.click();
    });

    await this.navigate(this.url);
    await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded'

  }

  async connectToWebSocket() {
    await this.websocketConnectButton.click();
  }

  async disconnectToWebSocket() {
    await expect.soft(this.websocketDisconnectButton).toBeVisible();
    await this.websocketDisconnectButton.click();
  }

  async sendMessage(message: string) {
    await expect(this.page.getByText('Connected')).toBeVisible();
    await this.MessageInput.click();
    await this.MessageInput.fill(message);
    await this.MessageSendButton.click();
    await this.MessageSendButton.isDisabled();
  }

  getSentMessages(): string[] {
    return this.wsMessagesSent;
  }

  getReceivedMessages(): string[] {
    return this.wsMessagesReceived;
  } 


}