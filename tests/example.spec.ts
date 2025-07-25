import { test, expect } from '@playwright/test';

test('Playwright Homepage - ', async ({ page }) => {

  await test.step('Navigate to URL', async step => {
    await page.goto('https://playwright.dev/');
    const home = await page.screenshot({ path: './playwright-report/data/playwright-homepage.png' });
    await step.attach('Playwright Homepage', {
      body: home,
      contentType: 'image/png' 
    });

  });

  await test.step('has title', async step => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  await test.step('has Get started link', async step => {
    // link must be visible
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

    // link must have href attribute
    await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href','/docs/intro');

    // link hover
    await page.getByRole('link', { name: 'Get started' }).hover();

    // link must be change colour on hover
    await expect(page.getByRole('link', { name: 'Get started' })).toHaveCSS('background-color', 'rgb(69, 186, 75)');
  });
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');


  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
