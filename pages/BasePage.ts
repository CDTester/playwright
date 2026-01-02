import { Page, Locator } from '@playwright/test';
import * as allure from "allure-js-commons";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async navigate (url: string) {
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        await this.page.goto(url, { timeout: 5000, waitUntil: 'domcontentloaded' });
        success = true;
      }
      catch (error: any) {
        console.warn(`Attempt ${attempt + 1} failed: ${error.message}`);
        attempt++;

        if (attempt < maxRetries) {
          // Try reloading the page instead of a full goto
          try {
            await this.page.reload({ timeout: 5000, waitUntil: 'domcontentloaded' });
          }
          catch (reloadError: any) {
            console.warn(`Reload failed: ${reloadError.message}`);
          }
        }
      }
    }

    if (!success) {
      console.error(`Failed to navigate to ${url} after ${maxRetries} attempts.`);
    }
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async clickElement(locator: Locator) {
    await locator.click();
  }

  async fillInput(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout: number = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async takeLocatorScreenshot (locator: Locator, name: string): Promise<string> {
    let screenshot: string | Buffer<ArrayBufferLike> | undefined;
    let text:string = new Date().toISOString().replace(/[:.]/g, '_').replace(/[^a-zA-Z0-9]/g, '_');
    
    const path = `./playwright-report/data/${text}.png`;
    screenshot = await locator.screenshot({ path: path, scale: "css" });

    await allure.attachmentPath(name, path, {contentType: allure.ContentType.PNG, fileExtension: 'png'});

    return path;
  }

  async takeScreenshot (wholePage: boolean = false, filename: string, scrollTo?: Locator): Promise<string> {
    let screenshot: string | Buffer<ArrayBufferLike> | undefined;
    const suffix = new Date().toISOString().replace(/[:.]/g, '_');
    const finalFilename = filename.replace(/[^a-zA-Z0-9]/g, '_') + suffix + '.png';
    const path = `./playwright-report/data/${finalFilename}`;
    if ( scrollTo ) {
      await scrollTo.scrollIntoViewIfNeeded();
    }
    screenshot = await this.page.screenshot({ path: path, fullPage: wholePage, scale: "css" });

    await allure.attachmentPath(filename, path, {contentType: allure.ContentType.PNG, fileExtension: 'png'});

    return path;
  }

}