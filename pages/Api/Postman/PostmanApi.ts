import { BaseApi } from '../BaseApi';

export class PostmanApi extends BaseApi {

  constructor(envData: any) {
    const envConfig = envData;
    const baseURL = envConfig.apiAuthApiKey.baseUrl;
    const headers = { 
      "connection": "keep-alive", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Cache-Control": "no-cache" 
    };
    super(baseURL, headers);

    // set Bearer token for authentication, this can be modified by tests if needed
    this.setAuthToken(envConfig.apiAuthApiKey.authType, envConfig.apiAuthApiKey.authKey);
  }


  // Get user
  async getMe(): Promise<any> {
    const response = await this.get('/me');
    return response;
  }

}