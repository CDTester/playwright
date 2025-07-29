import { test, expect } from '@playwright/test';



test.describe('Playwright Homepage Tests', () => {

  test.beforeEach(async ({ browser, page }) => {
    // Navigate to the Playwright homepage before each test
    await page.goto('https://playwright.dev/');
    const home = await page.screenshot({ path: `./playwright-report/data/playwright-homepage_${browser.browserType().name()}.png` });
    await test.info().attach('Playwright Homepage', { body: home, contentType: 'image/png' });
    // console.log(test.info().file);
    // console.log(test.info().project.use.viewport);
  });

  test('Playwright Homepage without steps - ', async ({ page }) => {

    // Expect a title "to contain" a substring.
    console.log((await page.title()).toString);
    await expect(page).toHaveTitle(/Playwright/);

    // link must be visible
    const link = page.getByRole('link', { name: 'Get started' });
    await expect(link).toBeVisible();
    // console.log(link.getAttribute('href'));
    const linkImg = await link.screenshot({ path: './playwright-report/data/getStartedLink.png' });
    await test.info().attach('Get Started Link', { body: linkImg, contentType: 'image/png' });

    // link must have href attribute
    await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href','/docs/intro');

    // link hover
    await page.getByRole('link', { name: 'Get started' }).hover();

    // link must be change colour on hover
    await expect(page.getByRole('link', { name: 'Get started' })).toHaveCSS('background-color', 'rgb(69, 186, 75)');
  });


  test('Playwright Homepage with steps- ', async ({ browser, context, page }) => {

    await test.step('Should have page title containing the text "Playwright"', async step => {
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    });

    await test.step('Should have "Get started" link', async step => {
      // link must be visible

      const link = page.getByRole('link', { name: 'Get started' });
      await expect(link).toBeVisible();
      // console.log(link.getAttribute('href'));
      const linkImg = await link.screenshot({ path: `./playwright-report/data/getStartedLink_${browser.browserType().name()}.png` });
      await test.info().attach('Get Started Link', { body: linkImg, contentType: 'image/png' });

      // link must have href attribute
      await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href','/docs/intro');

      // link hover
      await page.getByRole('link', { name: 'Get started' }).hover();

      // link must be change colour on hover
      await expect(page.getByRole('link', { name: 'Get started' })).toHaveCSS('background-color', 'rgb(69, 186, 75)');
    });

    await test.step('When "get started" link is clicked', async step => {
      // console.log(browser.browserType().name());
      // console.log(context.cookies());

      // Click the get started link.
      await page.getByRole('link', { name: 'Get started' }).click();
    });

    await test.step('Then the user is navigated to the "Installation" page', async step => {
      // Expects page to have a heading with the name of Installation.
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
  });
});

