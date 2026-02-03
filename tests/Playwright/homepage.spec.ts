import { test, expect } from '../../fixtures/playwrightFixture';
import * as allure from "allure-js-commons";

test.describe('Playwright Homepage', {tag: ['@Playwright', '@Homepage']}, async () => {

  test.beforeEach('Navigate to Playwright Homepage', async ({ homePage }) => {
    await allure.parentSuite('ParentSuite: Playwright');
    await allure.suite('Suite: Homepage Tests');
    // add feature to clean up the report structure
    await allure.epic('Epic: Playwright');
    await allure.feature('Feature: Homepage Tests');
    await allure.owner('Chris');


    await allure.step(`GIVEN ${homePage.url} has loaded`, async ( step ) => {
      await homePage.goto();
    });
  });


  test('Homepage should have correct page Title', {tag: ['@smoke']}, async ({ homePage }) => {
    await allure.subSuite('SubSuite: Homepage content');
    await allure.story('Story: Homepage content');
    await allure.tms('PLAY-001');
    await allure.issue('BUG-001');
    await allure.severity(allure.Severity.BLOCKER);

    await allure.step('Should have the correct page title', async (step) => {
      await homePage.takeScreenshot(true, 'homepage');
      step.parameter('Page Title', await homePage.page.title());
      await expect(homePage.page, `Expect page title to be [${homePage.pageTitle}]`).toHaveTitle(homePage.pageTitle);
    });
  });

  test('Homepage should have Navigation Menu', {tag: ['@regression']}, async ({ homePage }) => {
    await allure.subSuite('SubSuite: Homepage content');
    await allure.story('Story: Homepage content');
    await allure.tms('PLAY-002');
    await allure.issue('BUG-002');
    await allure.severity(allure.Severity.CRITICAL);

    await allure.step('Should have top navigation menu', async (step) => {
      step.parameter('Top Nav Menu', await homePage.topNavMenu.innerText());
      await homePage.takeScreenshot(false, 'homepage_menu');
      await expect(homePage.topNavMenu, `Expect top navigation menu to be visible`).toBeVisible();
    });
  });

  test('Homepage should have a Header section', {tag: ['@regression']}, async ({ homePage }) => {
    await allure.subSuite('SubSuite: Homepage content');
    await allure.story('Story: Homepage content');
    await allure.tms('PLAY-003');
    await allure.issue('BUG-003');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('Should have a banner section', async (step) => {
      await homePage.takeScreenshot(false, 'homepage_banner', homePage.banner);
      await expect(homePage.banner, `Expect banner section to be visible`).toBeVisible();
    });

    await allure.step('Should have top heading text', async (step) => {
      let expectedText = 'Playwright enables reliable end-to-end testing for modern web apps.';
      step.parameter('Header Text', await homePage.headerText.innerText());
      await expect(homePage.headerText, `Expect header text to be visible`).toBeVisible();
      await expect(homePage.headerText, `Expect header text to be ${expectedText}`).toHaveText(expectedText);
    });

    await allure.step(`Should have link to 'GET STARTED'`, async (step) => {
      step.parameter('Get Started Link', String(await homePage.headerGetStarted.getAttribute('href')));
      await expect(homePage.headerGetStarted, `Expect Get Started link to be visible`).toBeVisible();
      await expect(homePage.headerGetStarted, `Expect Get Started link have href attribute ${homePage.linkGetStarted}`).toHaveAttribute('href', homePage.linkGetStarted);
    });

    await allure.step(`Should have links to GitHub`, async (step) => {
      step.parameter('GitHub Link', String(await homePage.headerGithubLink.getAttribute('href')));
      await expect(homePage.headerGithubLink, `Expect GitHub link to be visible`).toBeVisible();
      await expect(homePage.headerGithubLink, `Expect GitHub link have href attribute ${homePage.linkGithub}`).toHaveAttribute('href', homePage.linkGithub);
    });
  });


    test('Homepage should have a Footer section', {tag: ['@regression']}, async ({ homePage }) => {
    await allure.subSuite('SubSuite: Homepage content');
    await allure.story('Story: Homepage content');
    await allure.tms('PLAY-004');
    await allure.issue('BUG-004');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('Should have a footer section', async (step) => {
      await homePage.takeScreenshot(false, 'homepage_footer', homePage.footer);
      await expect(homePage.footer, `Expect footer section to be visible`).toBeVisible();
    });


    await allure.step('Should have "Getting started" link in footer', async (step) => {
      let expectedText = 'Playwright enables reliable end-to-end testing for modern web apps.';
      step.parameter('Header Text', await homePage.headerText.innerText());
      await expect(homePage.FooterGettingStarted, `Expect 'Getting started' link in footer to be visible`).toBeVisible();
      await expect(homePage.FooterGettingStarted, `Expect 'Getting started' link in footer to have href attribute '${homePage.linkGetStarted}'`).toHaveAttribute('href', '/docs/intro');
    });
  });


});

