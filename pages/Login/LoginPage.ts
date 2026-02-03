import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  readonly baseUrl: string = 'https://www.selenium.dev';
  readonly url: string = '/selenium/web/login.html';
  readonly headerText: Locator;;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  protected alertMessage: string = '';
  protected successMessage:string = 'You have successfully logged in';
  protected errorMessage:string = 'Please enter valid credentials';

  constructor(page: Page) {
    super(page);
    this.headerText = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.alertMessage = '';
  }

  async login(username: string, password: string): Promise<string> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.page.on('dialog', dialog => this.alertMessage = dialog.message());
    await this.clickElement(this.loginButton);
    return this.alertMessage;
  }

  async enterUsername(username: string) {
    await this.fillInput(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fillInput(this.passwordInput, password);
  }

  async clickLogin(): Promise<string> {
    await this.page.on('dialog', dialog => this.alertMessage = dialog.message());
    await this.clickElement(this.loginButton);
    return this.alertMessage;
  }
  

  closeAlert() {
    this.page.on('dialog', dialog => dialog.dismiss());
  }
}