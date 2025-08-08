import { test, expect } from '@playwright/test';
import { homePage } from '../../pages/home-page';

let homepage: homePage;

test.describe('Playwright Tests using POM', () => {

  test.beforeEach(async ({ browser, page }) => {
    // Navigate to the Playwright homepage before each test
    homepage = new homePage(page);
    await homepage.goto();
    await test.info().attach('Playwright Homepage', { body: await homepage.takeScreenshot(true), contentType: 'image/png' });
  });


  test('Homepage', async ({ browser, context, page }) => {

    await test.step('Should have page title containing the text "Playwright"', async step => {
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    });

    await test.step('Should have "Docs" link in nav bar', async step => {
      // link must be visible

      const link = homepage.linkDocsNavbar;
      await expect(link).toBeVisible();
      await test.info().attach('Docs link', { body: await homepage.takeScreenshot(false, link), contentType: 'image/png' });

      // link must have href attribute
      await expect(link).toHaveAttribute('href', '/docs/intro');
    });

    await test.step('Should have "Getting started" link in footer', async step => {
      // link must be visible

      const link = homepage.linkDocsFooter;
      await expect(link).toBeVisible();
      await test.info().attach('Get Started Link', { body: await homepage.takeScreenshot(false, link), contentType: 'image/png' });

      // link must have href attribute
      await expect(link).toHaveAttribute('href', '/docs/intro');
    });

    await test.step('Should have "Get started" link in main body', async step => {
      // link must be visible

      const link = homepage.linkGetStarted;
      await expect(link).toBeVisible();
      await test.info().attach('Getting Started Link', { body: await homepage.takeScreenshot(false, link), contentType: 'image/png' });

      // link must have href attribute
      await expect(link).toHaveAttribute('href', '/docs/intro');

      // link hover
      await link.hover();

      // link must be change colour on hover
      await expect(link).toHaveCSS('background-color', 'rgb(69, 186, 75)');
    });

    await test.step('When "get started" link is clicked', async step => {
      // Click the get started link.
      const link = homepage.linkGetStarted;
      await link.click();
    });

    await test.step('Then the user is navigated to the "Installation" page', async step => {
      // Expects page to have a heading with the name of Installation.
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
  });
});

