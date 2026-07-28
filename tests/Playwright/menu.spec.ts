import { test, expect } from '../../fixtures/playwrightFixture';
import { testAnnotation } from '../../utils/reporter';
import * as allure from "allure-js-commons";
const annotation1 = testAnnotation('PLAY-011', 'BUG-011', 'BLOCKER');
const annotation2 = testAnnotation('PLAY-012', 'BUG-012', 'CRITICAL');
const annotation3 = testAnnotation('PLAY-013', 'BUG-013', 'NORMAL');
const annotation4 = testAnnotation('PLAY-014', 'BUG-014', 'MINOR');
const annotation5 = testAnnotation('PLAY-015', 'BUG-015', 'MINOR');
const annotation6 = testAnnotation('PLAY-017', 'BUG-017', 'NORMAL');
const annotation7 = testAnnotation('PLAY-018', 'BUG-018', 'NORMAL');
const annotation8 = testAnnotation('PLAY-019', 'BUG-019', 'NORMAL');
const annotation9 = testAnnotation('PLAY-020', 'BUG-020', 'CRITICAL');
const annotation10 = testAnnotation('PLAY-021', 'BUG-021', 'NORMAL');
const annotation11 = testAnnotation('PLAY-022', 'BUG-022', 'NORMAL');
const annotation12 = testAnnotation('PLAY-023', 'BUG-023', 'MINOR');
const annotation13 = testAnnotation('PLAY-024', 'BUG-024', 'MINOR');
const annotation14 = testAnnotation('PLAY-026', 'BUG-026', 'NORMAL');
const annotation15 = testAnnotation('PLAY-027', 'BUG-027', 'NORMAL');
const annotation16 = testAnnotation('PLAY-028', 'BUG-028', 'TRIVIAL');

test.describe('Playwright Menu', {tag: ['@Playwright', '@Menu']}, async () => {

  test.beforeEach('Navigate to Playwright Homepage', async ({ homePage }) => {
    await allure.parentSuite('ParentSuite: Playwright');
    await allure.suite('Suite: Menu Tests');

    await allure.epic('Epic: Playwright');
    await allure.feature('Feature: Menu Tests');
    await allure.owner('Chris');

    await allure.step(`GIVEN ${homePage.url} has loaded`, async ( step ) => {
      await homePage.goto();
    });
  });

  test(`Menu (Large screen) should have homepage link to 'Playwright'`, 
  {annotation: annotation1, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-011');
    await allure.issue('BUG-011');
    await allure.severity(allure.Severity.BLOCKER);

    await allure.step('THEN there should be a link to "Playwright" for Node.js', async () => {
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenu, 'Menu_LargeScreen');
      await expect(menuPage.menuPlaywright, `link text should be "Playwright"`).toHaveText('Playwright');
      await expect(menuPage.menuPlaywright, `Expect link href to be '${menuPage.getLinkHref('nodejs')}'`).toHaveAttribute('href', menuPage.getLinkHref('nodejs'));
    });
  });

  test(`Menu (Large screen) should have link for 'Docs'`, 
  {annotation: annotation2, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-012');
    await allure.issue('BUG-012');
    await allure.severity(allure.Severity.CRITICAL);

    await allure.step('THEN there should be a link to "Docs"', async step => {
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenu, 'Menu_LargeScreen');
      await expect(menuPage.menuDocs).toBeVisible();
      await expect(menuPage.menuDocs, `link text should be "Docs"`).toHaveText('Docs');
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });
  });

  test(`Menu (Large screen) should have link for 'API'`, 
  {annotation: annotation3, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-013');
    await allure.issue('BUG-013');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('THEN there should be a link to "API"', async step => {
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenu, 'Menu_LargeScreen');
      await expect(menuPage.menuAPI).toBeVisible();
      await expect(menuPage.menuAPI, `link text should be "API"`).toHaveText('API');
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });
  });

  test(`Menu (Large screen) should have link for 'Node.js'`, 
  {annotation: annotation4, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-014');
    await allure.issue('BUG-014');
    await allure.severity(allure.Severity.MINOR);

    await allure.step('THEN there should be a link to "Node.js"', async step => {
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenu, 'Menu_LargeScreen');
      await expect(menuPage.menuLanguageSelectedNodeJS).toBeVisible();
      await expect(menuPage.menuLanguageSelectedNodeJS, `link text should be "Node.js"`).toHaveText(/^Node.js/);
      await expect(menuPage.menuLanguageSelectedNodeJS, `Expect link href to be '${menuPage.getLinkHref('languages')}'`).toHaveAttribute('href', menuPage.getLinkHref('languages'));
    });
  });

  test(`Menu (Large screen) should have drop down menu for other languages`, 
  {annotation: annotation5, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-015');
    await allure.issue('BUG-015');
    await allure.severity(allure.Severity.MINOR);

    await allure.step('AND the dropdown menu for other languages is not shown', async step => {
      await expect(menuPage.menuNodeJS).not.toBeVisible();
      await expect(menuPage.menuPython).not.toBeVisible();
      await expect(menuPage.menuJava).not.toBeVisible();
      await expect(menuPage.menuDotNet).not.toBeVisible();
    });

    await allure.step('WHEN you hover over the languages menu', async step => {
      await menuPage.menuLanguageSelectedNodeJS.hover();
      await menuPage.takeScreenshot(false, 'Menu_LargeScreen_withDropdown');
    });

    await allure.step('THEN it Should reveal dropdown menu for other languages', async step => {
      await expect(menuPage.menuNodeJS).toBeVisible();
      await expect(menuPage.menuNodeJS, `link text should be "Node.js"`).toHaveText(/^Node.js/);
      await expect(menuPage.menuNodeJS, `Expect link href to be '${menuPage.getLinkHref('nodejs')}'`).toHaveAttribute('href', menuPage.getLinkHref('nodejs'));

      await expect(menuPage.menuPython).toBeVisible();
      await expect(menuPage.menuPython, `link text should be "Python"`).toHaveText('Python');
      await expect(menuPage.menuPython, `Expect link href to be '${menuPage.getLinkHref('python')}'`).toHaveAttribute('href', menuPage.getLinkHref('python'));

      await expect(menuPage.menuJava).toBeVisible();
      await expect(menuPage.menuJava, `link text should be "Java"`).toHaveText('Java');
      await expect(menuPage.menuJava, `Expect link href to be '${menuPage.getLinkHref('java')}'`).toHaveAttribute('href', menuPage.getLinkHref('java'));
      await expect(menuPage.menuDotNet).toBeVisible();
      await expect(menuPage.menuDotNet, `link text should be ".NET"`).toHaveText('.NET');
      await expect(menuPage.menuDotNet, `Expect link href to be '${menuPage.getLinkHref('dotnet')}'`).toHaveAttribute('href', menuPage.getLinkHref('dotnet'));
    });
  });

  test(`Menu (Large screen) should change menu links when python language is selected`, 
  {annotation: annotation6, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-017');
    await allure.issue('BUG-017');
    await allure.severity(allure.Severity.NORMAL);


    await allure.step('WHEN the language is changed to Python', async step => {
      await menuPage.changeLanguageTo('python');
      await menuPage.takeScreenshot(false, 'Menu_LargeScreen_Python');
    });

    await allure.step('THEN it should have homepage link to "Playwright for Python"', async () => {
      await expect(menuPage.menuPlaywright, `link text should be "Playwright for Python"`).toHaveText('Playwright for Python');
      await expect(menuPage.menuPlaywright, `Expect link href to be '${menuPage.getLinkHref('python')}'`).toHaveAttribute('href', menuPage.getLinkHref('python'));
    });

    await allure.step('AND have \'Docs\' link to Python docs', async () => {
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });

    await allure.step('AND have \'API\' link to Python API docs', async () => {
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });
  });

  test(`Menu (Large screen) should change menu links when Java language is selected`, 
  {annotation: annotation7, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-018');
    await allure.issue('BUG-018');
    await allure.severity(allure.Severity.NORMAL);


    await allure.step('WHEN the language is changed to Java', async step => {
      await menuPage.changeLanguageTo('java');
      await menuPage.takeScreenshot(false, 'Menu_LargeScreen_Java');
    });

    await allure.step('THEN it should have homepage link to "Playwright for Java"', async () => {
      await expect(menuPage.menuPlaywright, `link text should be "Playwright for Java"`).toHaveText('Playwright for Java');
      await expect(menuPage.menuPlaywright, `Expect link href to be '${menuPage.getLinkHref('java')}'`).toHaveAttribute('href', menuPage.getLinkHref('java'));
    });

    await allure.step('AND have \'Docs\' link to Java docs', async () => {
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });

    await allure.step('AND have \'API\' link to Java API docs', async () => {
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });

  });

  test(`Menu (Large screen) should change menu links when .NET language is selected`, 
  {annotation: annotation8, tag: ['@smoke']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Large Screen');
    await allure.story('Story: Menu - Large Screen');
    await allure.tms('PLAY-019');
    await allure.issue('BUG-019');
    await allure.severity(allure.Severity.NORMAL);


    await allure.step('WHEN the language is changed to .NET', async step => {
      await menuPage.changeLanguageTo('dotnet');
      await menuPage.takeScreenshot(false, 'Menu_LargeScreen_DotNet');
    });

    await allure.step('THEN it should have homepage link to "Playwright for .NET"', async () => {
      await expect(menuPage.menuPlaywright, `link text should be "Playwright for .NET"`).toHaveText('Playwright for .NET');
      await expect(menuPage.menuPlaywright, `Expect link href to be '${menuPage.getLinkHref('dotnet')}'`).toHaveAttribute('href', menuPage.getLinkHref('dotnet'));
    });

    await allure.step('AND have \'Docs\' link to .NET docs', async () => {
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });

    await allure.step('AND have \'API\' link to .NET API docs', async () => {
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });
;
  });

  test(`Menu (Small screen) should have homepage link to 'Playwright'`, 
  {annotation: annotation9, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-020');
    await allure.issue('BUG-020');
    await allure.severity(allure.Severity.CRITICAL);

    await allure.step('THEN it should have link to "Playwright"', async () => {
      await menuPage.smallScreenSize();
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenu, 'Menu_SmallScreen');
      await expect(menuPage.menuPlaywright, `link text should be "Playwright"`).toHaveText('Playwright');
      await expect(menuPage.menuPlaywright, `Expect link href to be '${menuPage.getLinkHref('nodejs')}'`).toHaveAttribute('href', menuPage.getLinkHref('nodejs'));
    });
  });

  test(`Menu (Small screen) should have link for 'Docs'`, 
  {annotation: annotation10, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-021');
    await allure.issue('BUG-021');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('AND the link to "Docs" is not visible when menu is closed', async step => {
      await menuPage.smallScreenSize();
      await expect(menuPage.topNavMenuMini).not.toBeVisible();
      await expect(menuPage.menuDocs).not.toBeVisible();
    });

    await allure.step('WHEN the menu icon is clicked to open the menu', async step => {
      await expect(menuPage.topNavMenuMiniOpen).toBeVisible();
      await menuPage.OpenMiniMenu();
    });

    await allure.step('THEN it should have link to "Docs"', async step => {
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenuMini, 'Menu_SmallScreenOpened');
      await expect(menuPage.topNavMenuMini).toBeVisible();
      await expect(menuPage.menuDocs, `link text should be "Docs"`).toHaveText('Docs');
      await expect(menuPage.menuDocs).toBeVisible();
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });
  });

  test(`Menu (Small screen) should have link for 'API'`, 
  {annotation: annotation11, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-022');
    await allure.issue('BUG-022');
    await allure.severity(allure.Severity.NORMAL);

    await allure.step('AND the link to "API" is not visible when menu is closed', async step => {
      await menuPage.smallScreenSize();
      await expect(menuPage.topNavMenuMini).not.toBeVisible();
      await expect(menuPage.menuAPI).not.toBeVisible();
    });

    await allure.step('WHEN the menu icon is clicked to open the menu', async step => {
      await expect(menuPage.topNavMenuMiniOpen).toBeVisible();
      await menuPage.OpenMiniMenu();
    });

    await allure.step('THEN it should have link to "API"', async step => {
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenuMini, 'Menu_SmallScreenOpened');
      await expect(menuPage.topNavMenuMini).toBeVisible();
      await expect(menuPage.menuAPI, `link text should be "API"`).toHaveText('API');
      await expect(menuPage.menuAPI).toBeVisible();
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });
  });

  test(`Menu (Small screen) should have link for 'Node.js'`, 
  {annotation: annotation12, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-023');
    await allure.issue('BUG-023');
    await allure.severity(allure.Severity.MINOR);

    await allure.step('AND the link to "Node.js" is not shown when menu is closed', async step => {
      await menuPage.smallScreenSize();
      await expect(menuPage.topNavMenuMini).not.toBeVisible();
      await expect(menuPage.menuLanguageSelectedNodeJS).not.toBeVisible();
    });

    await allure.step('WHEN the menu icon is clicked to open the menu', async step => {
      await expect(menuPage.topNavMenuMiniOpen).toBeVisible();
      await menuPage.OpenMiniMenu();
    });

    await allure.step('THEN it should have link to "Node.js"', async step => {
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenuMini, 'Menu_SmallScreenOpened');
      await expect(menuPage.menuLanguageSelectedNodeJS).toBeVisible();
      await expect(menuPage.menuLanguageSelectedNodeJS, `link text should be "Node.js"`).toHaveText(/^Node.js/);
      await expect(menuPage.menuLanguageSelectedNodeJS, `Expect link href to be '${menuPage.getLinkHref('languages')}'`).toHaveAttribute('href', menuPage.getLinkHref('languages'));
    });
  });

  test(`Menu (Small screen) should have drop down menu for other languages`, 
  {annotation: annotation13, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-024');
    await allure.issue('BUG-024');
    await allure.severity(allure.Severity.MINOR);

    await allure.step('AND the link to "Node.js" is not shown when menu is closed', async step => {
      await menuPage.smallScreenSize();
      await expect(menuPage.topNavMenuMini).not.toBeVisible();
      await expect(menuPage.menuLanguageSelectedNodeJS).not.toBeVisible();
    });

    await allure.step('AND the menu icon is clicked to open the menu', async step => {
      await expect(menuPage.topNavMenuMiniOpen).toBeVisible();
      await menuPage.OpenMiniMenu();
    });

    await allure.step('AND it should not show dropdown menu for other languages', async step => {
      await expect(menuPage.menuNodeJS).not.toBeVisible();
      await expect(menuPage.menuPython).not.toBeVisible();
      await expect(menuPage.menuJava).not.toBeVisible();
      await expect(menuPage.menuDotNet).not.toBeVisible();
    });

    await allure.step('WHEN the menu for other languages is clicked', async step => {
      await menuPage.menuLanguageSelectedNodeJS.click();
      await menuPage.takeLocatorScreenshot(menuPage.topNavMenuMini, 'Menu_SmallScreenOpened');
    });

    await allure.step('THEN it should reveal dropdown menu for other languages', async step => {
      await expect(menuPage.menuNodeJS).toBeVisible();
      await expect(menuPage.menuNodeJS, `link text should be "Node.js"`).toHaveText(/^Node.js/);
      await expect(menuPage.menuNodeJS, `Expect link href to be '${menuPage.getLinkHref('nodejs')}'`).toHaveAttribute('href', menuPage.getLinkHref('nodejs'));

      await expect(menuPage.menuPython).toBeVisible();
      await expect(menuPage.menuPython, `link text should be "Python"`).toHaveText('Python');
      await expect(menuPage.menuPython, `Expect link href to be '${menuPage.getLinkHref('python')}'`).toHaveAttribute('href', menuPage.getLinkHref('python'));

      await expect(menuPage.menuJava).toBeVisible();
      await expect(menuPage.menuJava, `link text should be "Java"`).toHaveText('Java');
      await expect(menuPage.menuJava, `Expect link href to be '${menuPage.getLinkHref('java')}'`).toHaveAttribute('href', menuPage.getLinkHref('java'));
      await expect(menuPage.menuDotNet).toBeVisible();
      await expect(menuPage.menuDotNet, `link text should be ".NET"`).toHaveText('.NET');
      await expect(menuPage.menuDotNet, `Expect link href to be '${menuPage.getLinkHref('dotnet')}'`).toHaveAttribute('href', menuPage.getLinkHref('dotnet'));
    });
  });

  test(`Menu (Small screen) should change menu links when python language is selected`, 
  {annotation: annotation14, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-026');
    await allure.issue('BUG-026');
    await allure.severity(allure.Severity.NORMAL);


    await allure.step('WHEN the language is changed to Python', async step => {
      await menuPage.smallScreenSize();
      await menuPage.changeLanguageTo('python');
    });

    await allure.step('THEN it should have homepage link to "Playwright for Python"', async () => {

      // expect(async () => {code block}).toPass - retries step at a polled interval untill pass or timeout
      await expect(async () => {
        await menuPage.OpenMiniMenu();
        await expect(menuPage.topNavMenuMini).toBeVisible();
      }).toPass({intervals:[1000, 1500], timeout: 10000});

      await menuPage.takeScreenshot(false, 'Menu_SmallScreen_Python');

      await expect(menuPage.menuPlaywright.nth(1), `link text should be "Playwright for Python"`).toHaveText('Playwright for Python');
      await expect(menuPage.menuPlaywright.nth(1), `Expect link href to be '${menuPage.getLinkHref('python')}'`).toHaveAttribute('href', menuPage.getLinkHref('python'));
    });

    await allure.step('AND it should have \'Docs\' link to Python docs', async () => {
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });

    await allure.step('AND it should have \'API\' link to Python API docs', async () => {
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });

    // await allure.step('Should have \'Community\' link to Python community', async () => {
    //   await expect(menuPage.menuCommunity, `Expect link href to be '${menuPage.getLinkHref('community')}'`).toHaveAttribute('href', menuPage.getLinkHref('community'));
    // });
  });

  test(`Menu (Small screen) should change menu links when Java language is selected`, 
  {annotation: annotation15, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-027');
    await allure.issue('BUG-027');
    await allure.severity(allure.Severity.NORMAL);


    await allure.step('WHEN the language is changed to Java', async step => {
      await menuPage.smallScreenSize();
      await menuPage.changeLanguageTo('java');
    });

    await allure.step('THEN it should have homepage link to "Playwright for Java"', async () => {
      await menuPage.OpenMiniMenu();
      await expect(menuPage.topNavMenuMini).toBeVisible();
      await menuPage.takeScreenshot(false, 'Menu_SmallScreen_Java');

      await expect(menuPage.menuPlaywright.nth(1), `link text should be "Playwright for Java"`).toHaveText('Playwright for Java');
      await expect(menuPage.menuPlaywright.nth(1), `Expect link href to be '${menuPage.getLinkHref('java')}'`).toHaveAttribute('href', menuPage.getLinkHref('java'));
    });

    await allure.step('AND it should have \'Docs\' link to Java docs', async () => {
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });

    await allure.step('AND it should have \'API\' link to Java API docs', async () => {
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });

    // await allure.step('Should have \'Community\' link to Java community', async () => {
    //   await expect(menuPage.menuCommunity, `Expect link href to be '${menuPage.getLinkHref('community')}'`).toHaveAttribute('href', menuPage.getLinkHref('community'));
    // });
  });

  test(`Menu (Small screen) should change menu links when .NET language is selected`, 
  {annotation: annotation16, tag: ['@regression']}, async ({ menuPage }) => {
    await allure.subSuite('SubSuite: Menu - Small Screen');
    await allure.story('Story: Menu - Small Screen');
    await allure.tms('PLAY-028');
    await allure.issue('BUG-028');
    await allure.severity(allure.Severity.NORMAL);


    await allure.step('WHEN the language is chnaged to .NET', async step => {
      await menuPage.smallScreenSize();
      await menuPage.changeLanguageTo('dotnet');
    });

    await allure.step('THEN it should have homepage link to "Playwright for .NET"', async () => {
      await menuPage.OpenMiniMenu();
      await expect(menuPage.topNavMenuMini).toBeVisible();
      await menuPage.takeScreenshot(false, 'Menu_SmallScreen_DotNet');

      await expect(menuPage.menuPlaywright.nth(1), `link text should be "Playwright for .NET"`).toHaveText('Playwright for .NET');
      await expect(menuPage.menuPlaywright.nth(1), `Expect link href to be '${menuPage.getLinkHref('dotnet')}'`).toHaveAttribute('href', menuPage.getLinkHref('dotnet'));
    });

    await allure.step('AND it should have \'Docs\' link to .NET docs', async () => {
      await expect(menuPage.menuDocs, `Expect link href to be '${menuPage.getLinkHref('docs')}'`).toHaveAttribute('href', menuPage.getLinkHref('docs'));
    });

    await allure.step('AND it should have \'API\' link to .NET API docs', async () => {
      await expect(menuPage.menuAPI, `Expect link href to be '${menuPage.getLinkHref('api')}'`).toHaveAttribute('href', menuPage.getLinkHref('api'));
    });

    // await allure.step('Should have \'Community\' link to .NET community', async () => {
    //   await expect(menuPage.menuCommunity, `Expect link href to be '${menuPage.getLinkHref('community')}'`).toHaveAttribute('href', menuPage.getLinkHref('community'));
    // });
  });

});