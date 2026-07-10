import { Page, Locator, expect, WebSocket } from '@playwright/test';
import { BasePage } from '../BasePage';

export class IkeaHomePage extends BasePage {
  readonly url: string;
  readonly cookieConsentHeader: Locator;
  readonly cookieAcceptButton: Locator;
  readonly cookieRejectButton: Locator;

  constructor (page: Page, envData: any) {
    super(page);
    this.env = envData['ikea'];
    this.page = page;
    this.url=this.env.baseUrl;
    this.cookieAcceptButton = this.page.getByRole('button', { name: 'Accept' });
    this.cookieRejectButton = this.page.getByRole('button', { name: 'Reject' });
    this.cookieConsentHeader = this.page.getByRole('heading', { name: 'Hej! You are in control of your cookies.' });
  }

  async goto () {
    // what about page.routeWebsocket to intercept the websocket connection and mock the response?


    await this.page.addLocatorHandler(this.cookieConsentHeader, async () => {
      await this.cookieRejectButton.click();
    });

    await this.navigate(this.url);
    await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded'

  }


}