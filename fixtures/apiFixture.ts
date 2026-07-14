import { test as base, expect, APIResponse } from '@playwright/test';
import { BitlyApi } from '../pages/Api/Bitly/BitlyApi';
import { PostmanApi } from '../pages/Api/Postman/PostmanApi';
import { PostsApi } from '../pages/Api/Jsonplaceholder/PostsApi';
import { UsersApi } from '../pages/Api/Jsonplaceholder/UsersApi';

type PageFixtures = {
  bitlyApi: BitlyApi;
  postmanApi: PostmanApi;
  postsApi: PostsApi;
  usersApi: UsersApi;
  envData: object;
};

export const test = base.extend<PageFixtures>({
  envData: [async ({}, use: (data:object) => Promise<void>) => {
    const envDataString: string = process.env.envData as string;
    const data: object = JSON.parse(envDataString) ;
    await use(data); 
  }, { scope: 'worker' }],
  bitlyApi: async ({ envData }, use) => {
    const api = new BitlyApi(envData);
    await use(api);
    api.dispose();
  },
  postmanApi: async ({ envData }, use) => {
    const api = new PostmanApi(envData);
    await use(api);
    api.dispose();
  },
  postsApi: async ({ envData }, use) => {
    const api = new PostsApi(envData);
    await use(api);
    api.dispose();
  },
  usersApi: async ({ envData }, use) => {
    const api = new UsersApi(envData);
    await use(api);
    api.dispose();
  }

    //, you can add more fixtures here
});

export { expect, APIResponse, TestDetailsAnnotation  } from '@playwright/test';