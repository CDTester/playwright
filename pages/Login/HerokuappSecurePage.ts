import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HerokuappSecurePage extends BasePage {
  readonly url: string;
  readonly headerText: Locator;
  readonly logoutButton: Locator;
  readonly loggedInMessage:string = 'You logged into a secure area!';
  readonly welcomeMessage: Locator;

  constructor(page: Page, envData: object) {
    super(page);
    this.env = envData['herokuapp'];
    this.headerText = page.getByRole('heading', { name: 'Secure Area', exact: true });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
    this.url = this.env.baseUrl + '/secure';
    this.welcomeMessage = page.getByText(this.loggedInMessage);
  }


  async goto() {
    await this.navigate(this.url);
    //await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded' networkidle
  }

  
  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForURL(this.url, { waitUntil: 'domcontentloaded' });
    // await this.page.waitForLoadState('domcontentloaded');
    return await this.welcomeMessage.isVisible();
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getMessage(byText: string): Promise<Locator> {
    return this.page.getByText(byText);
  }
}