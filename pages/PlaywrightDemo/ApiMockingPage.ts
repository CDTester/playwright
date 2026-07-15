import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';


export class ApiMockingPage extends BasePage {
  readonly url: string;


  constructor (page: Page, envData: any) {
    super(page);
    this.env = envData['playwrightDemo'];
    this.page = page;
    this.url=`${this.env.baseUrl}/api-mocking`;
  }

  async goto () {
    await this.navigate(this.url);
    await this.page.waitForLoadState('domcontentloaded'); // or 'domcontentloaded'
  }

  async mockApiResponse(repsonseData: string[] | object[], _status: number = 200) {
    this.page.route('*/**/api/v1/fruits', route => {
      route.fulfill({ 
        status: _status, 
        json: repsonseData 
      });
    });
  };

}