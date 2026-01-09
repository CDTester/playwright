// pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';
import envData from '../../utils/loadEnvData';


export class MenuPage extends BasePage {
  readonly env: any;
  protected url: string;
  readonly page: Page;
  readonly topNavMenu: Locator;
  readonly topNavMenuMiniOpen: Locator;
  readonly topNavMenuMini: Locator;
  readonly menuPlaywright: Locator;
  readonly menuDocs: Locator;
  readonly menuAPI: Locator;
  readonly menuLanguageSelectedNodeJS: Locator;
  readonly menuNodeJS: Locator;
  readonly menuLanguageSelectedPython: Locator;
  readonly menuPython: Locator;
  readonly menuLanguageSelectedJava: Locator;
  readonly menuJava: Locator;
  readonly menuLanguageSelectedDotNet: Locator;
  readonly menuDotNet: Locator;
  readonly menuCommunity: Locator;

  private linkDocs: string = '/docs/intro';
  private linkAPI: string = '/docs/api/class-playwright';
  private linkLanguages: string = '#';
  private linkNodeJS: string = '/';
  private linkPython: string = '/python/';
  private linkJava: string = '/java/';
  private linkDotNet: string = '/dotnet/';
  private linkCommunity: string = '/community/welcome';


  constructor (page: Page) {
    super(page);
    this.env = new envData('MenuPage.ts').getEnvData;
    this.page = page;
    this.url=this.env.playwright.baseUrl;
    this.topNavMenu = page.getByRole('navigation', { name: 'Main' });

    // Menu screen locators
    this.menuPlaywright = page.getByRole('link', { name: /^Playwright logo/ });
    this.menuDocs = page.getByRole('link', { name: 'Docs' });
    this.menuAPI = page.getByRole('link', { name: 'API' });
    this.menuCommunity = page.getByRole('link', { name: 'Community' });

    // Language options
    this.menuLanguageSelectedNodeJS = page.getByRole('button', { name: 'Node.js' });
    this.menuNodeJS = page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Node.js' });
    this.menuLanguageSelectedPython = page.getByRole('button', { name: 'Python' });
    this.menuPython = page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Python' });
    this.menuLanguageSelectedJava = page.getByRole('button', { name: 'Java' });
    this.menuJava = page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Java' });
    this.menuLanguageSelectedDotNet = page.getByRole('button', { name: '.NET' });
    this.menuDotNet = page.getByLabel('Main', { exact: true }).getByRole('link', { name: '.NET' });

    // Smaller Menu screen locators
    this.topNavMenuMiniOpen = page.getByRole('button', { name: 'Toggle navigation bar' });
    this.topNavMenuMini = page.locator('div.theme-layout-navbar-sidebar');  //__item menu

    // links
    page.url()
  }

  async goto () {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle'); // or 'domcontentloaded'
  }

  /**
   * 
   * @param menuItem docs, api, languages, nodejs, python, java, dotnet, community
   * @returns href
   */
  getLinkHref( menuItem: string ): string {
    switch ( menuItem.toLowerCase() ) {
      case 'docs': return this.linkDocs;
      case 'api': return this.linkAPI;
      case 'languages': return this.linkLanguages;
      case 'nodejs': return this.linkNodeJS;
      case 'python': return this.linkPython;
      case 'java': return this.linkJava;
      case 'dotnet': return this.linkDotNet;
      case 'community': return this.linkCommunity;
      default: throw new Error(`Unsupported menu item: ${menuItem}`);
    }
  }

  async smallScreenSize() {
    await this.page.setViewportSize({ width: 500, height: 800 });
  }


  async isMenuMini() {
    return await this.menuDocs.isVisible() ? false : true;
  }
  
  async OpenMiniMenu() {
    await this.topNavMenuMiniOpen.click();
  }

  async changeLanguageTo ( language: string ) {
    const currentURL = this.page.url();
    let currentLanguage:string;

    if ( currentURL.includes('/python/') ) currentLanguage = 'python';
    else if ( currentURL.includes('/java/') ) currentLanguage = 'java';
    else if ( currentURL.includes('/dotnet/') ) currentLanguage = 'dotnet';
    else currentLanguage = 'nodejs';

    if (await this.isMenuMini()) {
      await this.OpenMiniMenu();
      if (currentLanguage === 'nodejs') await this.menuLanguageSelectedNodeJS.click();
      else if (currentLanguage === 'python') await this.menuLanguageSelectedPython.click();
      else if (currentLanguage === 'java') await this.menuLanguageSelectedJava.click();
      else if (currentLanguage === 'dotnet') await this.menuLanguageSelectedDotNet.click();
    }
    else {
      if (currentLanguage === 'nodejs') await this.menuLanguageSelectedNodeJS.hover();
      else if (currentLanguage === 'python') await this.menuLanguageSelectedPython.hover();
      else if (currentLanguage === 'java') await this.menuLanguageSelectedJava.hover();
      else if (currentLanguage === 'dotnet') await this.menuLanguageSelectedDotNet.hover();
    }

    switch ( language.toLowerCase() ) {
      case 'nodejs': 
        await this.menuNodeJS.click();
        this.url = this.env.playwright.baseUrl;
        this.linkDocs = '/docs/intro';
        this.linkAPI = '/docs/api/class-playwright';
        this.linkCommunity = '/community/welcome';
        break;
      case 'python': 
        await this.menuPython.click();
        this.url = this.env.playwright.baseUrl + 'python/';
        this.linkDocs = '/python/docs/intro';
        this.linkAPI = '/python/docs/api/class-playwright';
        this.linkCommunity = '/python/community/welcome';
        break;
      case 'java': 
        await this.menuJava.click();
        this.url = this.env.playwright.baseUrl + 'java/';
        this.linkDocs = '/java/docs/intro';
        this.linkAPI = '/java/docs/api/class-playwright';
        this.linkCommunity = '/java/community/welcome';
        break;
      case 'dotnet': 
        await this.menuDotNet.click();
        this.url = this.env.playwright.baseUrl + 'dotnet/';
        this.linkDocs = '/dotnet/docs/intro';
        this.linkAPI = '/dotnet/docs/api/class-playwright';
        this.linkCommunity = '/dotnet/community/welcome';
        break;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
    await this.page.waitForLoadState('networkidle'); // or 'domcontentloaded'
  }

}