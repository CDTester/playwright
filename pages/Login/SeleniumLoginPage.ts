import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import envData from '../../utils/loadEnvData';

export class SeleniumLoginPage extends BasePage {
  readonly env: any;
  readonly url: string;
  readonly headerText: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  protected alertMessage: string = '';
  readonly successMessage:string = 'You have successfully logged in.';
  readonly errorMessage:string = 'Please enter valid credentials';
  readonly pageSnapshot: string = `
    - document:
      - main:
        - heading "Login" [level=1]
        - textbox "Username"
        - textbox "Password"
        - button "Login"
    `;

  constructor(page: Page) {
    super(page);
    this.headerText = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.alertMessage = '';
    this.env = new envData('SeleniumLoginPage.ts').getEnvData;
    this.url = this.env.selenium.baseUrl + '/selenium/web/login.html';
  }


  async goto() {
    await this.navigate(this.url);
    await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded' networkidle
  }

  async login(username: string, password: string): Promise<string> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);

    await this.page.on('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      this.alertMessage = dialog.message();
      dialog.accept().catch(() => {})
    });

    await this.loginButton.click();
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
    await this.loginButton.click();
    return this.alertMessage;
  }
  
}