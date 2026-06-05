import { HerokuappLoginPage } from '../../../pages/Login/HerokuappLoginPage';
import { HerokuappSecurePage } from '../../../pages/Login/HerokuappSecurePage';
import { HerokuappData } from './HerokuappData';
import { chromium, firefox, webkit } from '@playwright/test';
import fs from 'fs';

export class HerokuappAuth {

  async setup(_browser: string, sessionPath: string, envData: object) {
    // check if auth state already exists
    if (await fs.existsSync(sessionPath)) {
      console.log('StorageState already exists, skipping setup');
    }
    else {
      console.log('StorageState does not exist, creating new storage state');
      const userData = HerokuappData;
      let browser: any;
      if (_browser === 'chromium') {
        browser = await chromium.launch();
      } 
      else if (_browser === 'firefox') {
        browser = await firefox.launch();
      }
      else if (_browser === 'webkit') {
        browser = await webkit.launch();
      }
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginPage = new HerokuappLoginPage(page, envData);
      const securePage = new HerokuappSecurePage(page, envData);

      await loginPage.goto();
      await loginPage.login(userData.validUser.username, userData.validUser.password);
      await securePage.page.waitForURL(securePage.url, {waitUntil: 'commit'});

      await context.storageState({ path: sessionPath });
      if (await fs.existsSync(sessionPath)) {
        console.log(`StorageState ${sessionPath} created successfully`);
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