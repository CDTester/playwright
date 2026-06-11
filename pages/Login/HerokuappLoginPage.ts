import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HerokuappLoginPage extends BasePage {
  readonly url: string;
  readonly headerText: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loggedOutMessage:string = 'You logged out of the secure area!';
  readonly errorMessage:string = 'You must login to view the secure area!';


  constructor(page: Page, envData: object) {
    super(page);
    this.env = envData['herokuapp'];
    this.headerText = page.getByRole('heading', { name: 'Login Page' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: ' Login' });
    this.url = this.env.baseUrl + '/login';
  }

  async goto() {
    await this.navigate(this.url);
    //await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded' networkidle
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // await this.page.waitForLoadState('domcontentloaded');
  }

  async getMessage(byText: string): Promise<Locator> {
    await this.page.waitForLoadState('domcontentloaded');
    return this.page.getByText(byText);
  }
}