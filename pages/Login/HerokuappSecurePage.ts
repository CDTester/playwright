import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import envData from '../../utils/loadEnvData';

export class HerokuappSecurePage extends BasePage {
  readonly env: any;
  readonly url: string;
  readonly headerText: Locator;
  readonly logoutButton: Locator;
  readonly loggedInMessage:string = 'You logged into a secure area!';
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.headerText = page.getByRole('heading', { name: 'Secure Area', exact: true });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
    this.env = new envData('HerokuappLoginPage.ts').getEnvData;
    this.url = this.env.herokuapp.baseUrl + '/secure';
    this.welcomeMessage = page.getByText(this.loggedInMessage);
  }


  async goto() {
    await this.navigate(this.url);
    await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded' networkidle
  }

  
  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForURL(this.url);
    // await this.page.waitForLoadState('domcontentloaded');
    return await this.isVisible(this.welcomeMessage);
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getMessage(byText: string): Promise<Locator> {
    return this.page.getByText(byText);
  }
}