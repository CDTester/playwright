import { test as base, expect, APIResponse } from '@playwright/test';
import { BitlyApi } from '../pages/Api/Bitly/BitlyApi';
import { PostmanApi } from '../pages/Api/Postman/PostmanApi';
import { PostsApi } from '../pages/Api/Jsonplaceholder/PostsApi';
import { UsersApi } from '../pages/Api/Jsonplaceholder/UsersApi';
import envData from '../utils/loadEnvData';

type PageFixtures = {
  bitlyApi: BitlyApi;
  postmanApi: PostmanApi;
  postsApi: PostsApi;
  usersApi: UsersApi;
  envData: object;
};

export const test = base.extend<PageFixtures>({
  envData: [async ({}, use: (data:object) => Promise<void>) => {
    const data = envData.getEnvData();
    await use(data); 
  }, { scope: 'worker' }],
  bitlyApi: async ({ envData }, use) => {
    const api = new BitlyApi(envData);
    await use(api);
  },
  postmanApi: async ({ envData }, use) => {
    const api = new PostmanApi(envData);
    await use(api);
  },
  postsApi: async ({ envData }, use) => {
    const api = new PostsApi(envData);
    await use(api);
  },
  usersApi: async ({ envData }, use) => {
    const api = new UsersApi(envData);
    await use(api);
  }

    //, you can add more fixtures here
});

export { expect, APIResponse } from '@playwright/test';