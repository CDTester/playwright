// pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import envData from '../utils/loadEnvData';


export class homePage {
  readonly page: Page;
  readonly link_getStarted: Locator;
  readonly env: any;

  constructor(page: Page) {
    // locator:
    // text: text='text to find' (add single quotes for exact match)
    // id: id='id value' (add single quotes for exact match)
    // xpath: //selector[@attribute='value']
    // css: by class:     selector.classname | .classname
    //      by id:        selector#idname | #idname
    //      by atribute:  selector[attribute=value] | [attribute=value]
    this.env = new envData('home-page.ts').getEnvData;
    this.page = page;
    this.link_getStarted = page.locator('//a[@href="/docs/intro"]', { hasText: 'Get started'});
  }

  async goto() {
    await this.page.goto(this.env.playwright.baseUrl);
  }

  async takeScreenshot(wholePage: boolean = false, locator?: Locator): Promise<string | Buffer<ArrayBufferLike> | undefined>{
    let screenshot: string | Buffer<ArrayBufferLike> | undefined;
    if (locator !== undefined) {
      const text = await locator.innerText();
      screenshot = await locator.screenshot({ path: `./playwright-report/data/${text.replace(/[^a-zA-Z0-9]/g, '_')}.png`, scale: "css" });
    } 
    else {
      screenshot = await this.page.screenshot({ path: `./playwright-report/data/homepage.png`, fullPage: wholePage, scale: "css" });
    }
    return screenshot;
  }

}