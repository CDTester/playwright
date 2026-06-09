import { Page, Locator } from '@playwright/test';
import * as allure from "allure-js-commons";

export abstract class BasePage {
  readonly page: Page;
  readonly env: any;

  constructor(page: Page) {
    this.page = page;
  }


  async navigate (url: string) {
    const maxRetries = 3;
    let attempt = 0;
    let lastError: any;

    while (attempt < maxRetries) {
      try {
        await this.page.goto(url, { waitUntil: 'commit', timeout: 30000 });
        return; // Success
      }
      catch (error: any) {
        lastError = error;
        attempt++;
        console.warn(`Navigation attempt ${attempt} failed: ${error.message}`);
        
        if (attempt < maxRetries) {
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    // After all retries failed
    console.error(`Failed to navigate to ${url} after ${maxRetries} attempts.`);
    throw lastError;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
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

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async setLocalStorage(key: string, value: string) {
    await this.page.evaluate(({ k, v }) => { localStorage.setItem(k, v); }, { k: key, v: value });
  }

  /**
   * Highlight an element with a colored border and optionally scroll it into view
   * @param locator - Playwright locator for the element to highlight
   * @param color - Border color (default: 'gold')
   * @param width - Border width in pixels (default: 3)
   * @param scrollIntoView - Whether to scroll element into view (default: true)
   * @param duration - How long to keep highlight in ms (0 = permanent, default: 0)
   */
  async highlightElement( locator: Locator, color: string = 'gold', scrollIntoView: boolean = true  ) {
    await locator.evaluate((element, { color, scrollIntoView }) => {
      // Scroll into view if requested
      if (scrollIntoView) element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Store original border to restore later if needed
      const originalBorder = element.style.border;
      const originalOutline = element.style.outline;

      // Apply highlight
      element.style.border = `3px solid ${color}`;
      element.style.outline = `3px solid ${color}`;

      // Store original values as data attributes
      element.setAttribute('data-original-border', originalBorder);
      element.setAttribute('data-original-outline', originalOutline);
    }, { color, scrollIntoView });

  }

  /**
   * Remove highlight from an element
   * @param locator - Playwright locator for the element
   */
  async removeHighlight(locator: Locator) {
    await locator.evaluate((element) => {
      const originalBorder = element.getAttribute('data-original-border');
      const originalOutline = element.getAttribute('data-original-outline');

      if (originalBorder !== null) {
        element.style.border = originalBorder;
        element.removeAttribute('data-original-border');
      }
      if (originalOutline !== null) {
        element.style.outline = originalOutline;
        element.removeAttribute('data-original-outline');
      }
    });
  }

}