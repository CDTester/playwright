import { HerokuappLoginPage } from '../../../pages/Login/HerokuappLoginPage';
import { HerokuappSecurePage } from '../../../pages/Login/HerokuappSecurePage';
import { HerokuappData } from './HerokuappData';
import { chromium } from '@playwright/test';

export class HerokuappAuth {

  async setup() {
    const userData = HerokuappData;
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new HerokuappLoginPage(page);
    const securePage = new HerokuappSecurePage(page);

    await loginPage.goto();
    await loginPage.login(userData.validUser.username, userData.validUser.password);
    await securePage.page.waitForURL(securePage.url);

    await context.storageState({ path: '../test-data/pages/LoginData/authState.herokuapp.json' });
    await browser.close();
  };

}