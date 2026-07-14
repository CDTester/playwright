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
    await this.navigate(this.url);
    await this.page.waitForLoadState('load'); // or 'domcontentloaded'
  }

  async rejectCookieConsent () {
    await this.page.addLocatorHandler(this.cookieConsentHeader, async () => {
      await this.highlightElement(this.cookieRejectButton, 'red', true);
      await this.cookieRejectButton.click();
    });

  }


}