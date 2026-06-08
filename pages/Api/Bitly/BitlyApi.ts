import { APIResponse } from 'playwright-core';
import { BaseApi } from '../BaseApi';

export class BitlyApi extends BaseApi {
  private config: any;

  constructor(envData: any) {
    super(envData.apiAuthBearer);
  }

  // Get user
  async getUser(): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    //const response = await this.get('/v4/user');
    const response = await this.buildRequest('GET', '/v4/user');
    return response;
  }

}