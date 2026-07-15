import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import path from 'path';

export class RandomCardPage extends BasePage {
  readonly url: string;
  readonly header: Locator;
  readonly reloadButton: Locator;
  readonly laptopCard: Locator;
  readonly keyboardCard: Locator;
  readonly mouseCard: Locator;
  readonly monitorCard: Locator;
  readonly phoneCard: Locator;
  readonly tabletCard: Locator;
  readonly printerCard: Locator;
  readonly speakerCard: Locator;
  readonly headphonesCard: Locator;
  readonly deskCard: Locator;
  readonly chairCard: Locator;
  readonly microphoneCard: Locator;
  readonly webcamCard: Locator;
  readonly basket: Locator;

  constructor (page: Page, envData: any) {
    super(page);
    this.env = envData['ikea'];
    this.page = page;
    this.url= `file://${path.resolve('test-data/randomOrder.html')}`; //this.env.baseUrl;
    this.header = this.page.getByRole('heading', { name: 'Random Product Loader' });
    this.reloadButton = this.page.getByRole('button', { name: 'Reload Products' });
    this.laptopCard = this.page.getByTestId('laptop');
    this.keyboardCard = this.page.getByTestId('keyboard');
    this.mouseCard = this.page.getByTestId('mouse');
    this.monitorCard = this.page.getByTestId('monitor');
    this.phoneCard = this.page.getByTestId('phone');
    this.tabletCard = this.page.getByTestId('tablet');
    this.printerCard = this.page.getByTestId('printer');
    this.speakerCard = this.page.getByTestId('speaker');
    this.headphonesCard = this.page.getByTestId('headphones');
    this.deskCard = this.page.getByTestId('desk');
    this.chairCard = this.page.getByTestId('chair');
    this.microphoneCard = this.page.getByTestId('microphone');
    this.webcamCard = this.page.getByTestId('webcam');
    this.basket = this.page.getByText(/Basket: \d* item\(s\)/);
  }

  async goto () {
    await this.navigate(this.url);
    await this.page.waitForLoadState('load'); // or 'domcontentloaded'
  }

  async waitForAllCards(): Promise<Boolean> {
    try{
      await Promise.all([
        expect(this.laptopCard).toBeVisible({timeout: 10000}),
        expect(this.keyboardCard).toBeVisible({timeout: 10000}),
        expect(this.mouseCard).toBeVisible({timeout: 10000}),
        expect(this.monitorCard).toBeVisible({timeout: 10000}),
        expect(this.phoneCard).toBeVisible({timeout: 10000}),
        expect(this.tabletCard).toBeVisible({timeout: 10000}),
        expect(this.printerCard).toBeVisible({timeout: 10000}),
        expect(this.speakerCard).toBeVisible({timeout: 10000}),
        expect(this.headphonesCard).toBeVisible({timeout: 10000}),
        expect(this.deskCard).toBeVisible({timeout: 10000}),
        expect(this.chairCard).toBeVisible({timeout: 10000}),
        expect(this.microphoneCard).toBeVisible({timeout: 10000}),
        expect(this.webcamCard).toBeVisible({timeout: 10000}),
      ]);

      console.log('All cards loaded');
      return true;
    }
    catch {
      console.log('Something went wrong');
      return false;
    }
  }

  async getPrice(card: Locator): Promise<string> {
    const price = await card.getByText('£').innerText();
    console.log('Price:', price)
    return price;
  }

  productPrice(card: Locator): Locator {
    return card.getByText('£');
  }

  async addToBasket(card: Locator): Promise<void> {
    await card.getByRole('button', {name: 'Add to Basket'}).scrollIntoViewIfNeeded();
    await card.getByRole('button', {name: 'Add to Basket'}).click();
    await expect(card.getByRole('button', { name: 'Added ✓' })).toBeVisible
  }

  async getNumberOfItemsInBasket(): Promise<Number> {
    const basket: string = await this.basket.innerText();
    const basketRegex: RegExp = /Basket: (?<items>\d*) item\(s\)/;
    const numberOfItems:RegExpExecArray = basketRegex.exec(basket);
    return Number(numberOfItems.groups.items);
  }

}