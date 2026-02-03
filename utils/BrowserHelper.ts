import { Page, Locator } from '@playwright/test';
import { attachment } from 'allure-js-commons';
import * as fs from 'fs';

export class BrowserHelper {
  static async clearCookies(page: Page) {
    await page.context().clearCookies();
  }

  static async setLocalStorage(page: Page, key: string, value: string) {
    await page.evaluate(({ k, v }) => {
      localStorage.setItem(k, v);
    }, { k: key, v: value });
  }

  static async getLocalStorage(page: Page, key: string): Promise<string | null> {
    return await page.evaluate((k) => localStorage.getItem(k), key);
  }

  static async takeScreenshot(page: Page, name: string) {
    await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  static async attachTrace(tracePath: string) {
    if (fs.existsSync(tracePath)) {
      const traceBuffer = fs.readFileSync(tracePath);
      await attachment('Trace', traceBuffer, 'application/zip');
      console.log(`Trace attached: ${tracePath}`);
    } else {
      console.log(`Trace file not found: ${tracePath}`);
    }
  }

  /**
   * Highlight an element with a colored border and optionally scroll it into view
   * @param locator - Playwright locator for the element to highlight
   * @param color - Border color (default: 'gold')
   * @param width - Border width in pixels (default: 3)
   * @param scrollIntoView - Whether to scroll element into view (default: true)
   * @param duration - How long to keep highlight in ms (0 = permanent, default: 0)
   */
  static async highlightElement(
    locator: Locator,
    color: string = 'gold',
    width: number = 3,
    scrollIntoView: boolean = true,
    duration: number = 0
  ) {
    await locator.evaluate((el, { color, width, scrollIntoView }) => {
      // Scroll into view if requested
      if (scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Store original border to restore later if needed
      const originalBorder = el.style.border;
      const originalOutline = el.style.outline;

      // Apply highlight
      el.style.border = `${width}px solid ${color}`;
      el.style.outline = `${width}px solid ${color}`;

      // Store original values as data attributes
      el.setAttribute('data-original-border', originalBorder);
      el.setAttribute('data-original-outline', originalOutline);
    }, { color, width, scrollIntoView });

    // If duration is specified, remove highlight after delay
    if (duration > 0) {
      await locator.page().waitForTimeout(duration);
      await this.removeHighlight(locator);
    }
  }

  /**
   * Remove highlight from an element
   * @param locator - Playwright locator for the element
   */
  static async removeHighlight(locator: Locator) {
    await locator.evaluate((el) => {
      const originalBorder = el.getAttribute('data-original-border');
      const originalOutline = el.getAttribute('data-original-outline');

      if (originalBorder !== null) {
        el.style.border = originalBorder;
        el.removeAttribute('data-original-border');
      }
      if (originalOutline !== null) {
        el.style.outline = originalOutline;
        el.removeAttribute('data-original-outline');
      }
    });
  }
  
  /**
   * Highlight element with animation effect
   * @param locator - Playwright locator for the element to highlight
   * @param color - Border color (default: 'red')
   * @param pulseCount - Number of times to pulse (default: 3)
   */
  static async highlightElementWithPulse(
    locator: Locator,
    color: string = 'red',
    pulseCount: number = 3
  ) {
    await locator.evaluate((el, { color, pulseCount }) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const originalBorder = el.style.border;
      const originalBoxShadow = el.style.boxShadow;

      let count = 0;
      const interval = setInterval(() => {
        if (count >= pulseCount * 2) {
          clearInterval(interval);
          el.style.border = originalBorder;
          el.style.boxShadow = originalBoxShadow;
          return;
        }

        if (count % 2 === 0) {
          el.style.border = `4px solid ${color}`;
          el.style.boxShadow = `0 0 10px ${color}`;
        } else {
          el.style.border = originalBorder;
          el.style.boxShadow = originalBoxShadow;
        }
        count++;
      }, 300);
    }, { color, pulseCount });

    // Wait for animation to complete
    await locator.page().waitForTimeout(pulseCount * 2 * 300);
  }

  /**
   * Highlight multiple elements at once
   * @param locators - Array of Playwright locators
   * @param color - Border color (default: 'gold')
   */
  static async highlightElements(locators: Locator[], color: string = 'gold') {
    for (const locator of locators) {
      await this.highlightElement(locator, color);
    }
  }

  /**
   * Flash highlight on element (useful for debugging/demonstrations)
   * @param locator - Playwright locator for the element
   * @param color - Border color (default: 'lime')
   * @param flashCount - Number of flashes (default: 2)
   */
  static async flashElement(
    locator: Locator,
    color: string = 'lime',
    flashCount: number = 2
  ) {
    for (let i = 0; i < flashCount; i++) {
      await this.highlightElement(locator, color, 5, true, 200);
      await locator.page().waitForTimeout(200);
    }
  }
}