// pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';


export class HomePage extends BasePage {
  readonly url: string;
  readonly pageTitle: string = 'Fast and reliable end-to-end testing for modern web apps | Playwright';
  readonly topNavMenu: Locator;
  readonly banner: Locator;
  readonly main: Locator;
  readonly footer: Locator;
  readonly headerGetStarted: Locator;
  readonly headerText: Locator;
  readonly headerGithubLink: Locator;
  readonly mainBrowsers: Locator;
  readonly linkGetStarted: string = '/docs/intro';
  readonly linkGithub: string = 'https://github.com/microsoft/playwright';
  readonly FooterGettingStarted: Locator;


  constructor (page: Page, envData: object) {
    super(page);
    this.env = envData['playwright'];
    this.page = page;
    this.url=this.env.baseUrl;
    this.topNavMenu = page.getByRole('navigation', { name: 'Main' });
    this.banner = page.getByRole('banner');
    this.main = page.getByRole('main');
    this.footer = page.getByRole('contentinfo');
    this.headerGetStarted = page.getByRole('link', { name: 'Get started' });
    this.headerText = page.getByRole('heading', { name: 'Playwright enables reliable' });
    this.headerGithubLink = page.getByRole('link', { name: 'Star microsoft/playwright on GitHub' });
    this.mainBrowsers = page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' });
    this.FooterGettingStarted = page.locator('//a[@href="/docs/intro"]').filter({ hasText: 'Getting Started' });
  }

  async goto () {
    await this.navigate(this.url);
    await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded'
  }

}