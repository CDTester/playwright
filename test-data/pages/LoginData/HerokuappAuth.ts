import { HerokuappLoginPage } from '../../../pages/Login/HerokuappLoginPage';
import { HerokuappSecurePage } from '../../../pages/Login/HerokuappSecurePage';
import { HerokuappData } from './HerokuappData';
import { chromium } from '@playwright/test';
import fs from 'fs';

export class HerokuappAuth {

  async setup() {
    // check if auth state already exists
    const sessionPath = '../test-data/pages/LoginData/authState.herokuapp.json';
    if (await fs.existsSync(sessionPath)) {
      console.log('StorageState already exists, skipping setup');
    }
    else {
      console.log('StorageState does not exist, creating new storage state');
      const userData = HerokuappData;
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginPage = new HerokuappLoginPage(page);
      const securePage = new HerokuappSecurePage(page);

      await loginPage.goto();
      await loginPage.login(userData.validUser.username, userData.validUser.password);
      await securePage.page.waitForURL(securePage.url, {waitUntil: 'commit'});

      await context.storageState({ path: sessionPath });
      if (await fs.existsSync(sessionPath)) {
        console.log('StorageState created successfully');
      }
      else {
        console.log('StorageState was not created successfully');
      }
      await page.close();
      await context.close();
      await browser.close();
    }
  };

}