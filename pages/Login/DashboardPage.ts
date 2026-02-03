import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class DashboardPage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.locator('.welcome-message');
    this.userMenu = page.locator('.user-menu');
    this.logoutButton = page.locator('button:has-text("Logout")');
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.welcomeMessage);
  }

  async logout() {
    await this.clickElement(this.userMenu);
    await this.clickElement(this.logoutButton);
  }
}