import { APIResponse } from '../../../fixtures/apiFixture';
import { BaseApi } from '../BaseApi';

export class PostmanApi extends BaseApi {
  private config: any;

  constructor(envData: any) {
    super(envData.apiAuthApiKey);
  }


  // Get user
  async getMe(): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('GET', '/me');
    return response;
  }

}