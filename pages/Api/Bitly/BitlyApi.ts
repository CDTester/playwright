import { BaseApi } from '../BaseApi';

export class BitlyApi extends BaseApi {
  readonly envConfig: any;


  constructor(envData: any) {
    const baseURL = envData.apiAuthBearer.baseUrl;
    const headers = { 
      "connection": "keep-alive", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Cache-Control": "no-cache" 
    };
    super(baseURL, headers);
    this.envConfig = envData;

    // set Bearer token for authentication, this can be modified by tests if needed
    this.setAuthToken(this.envConfig.apiAuthBearer.authType, this.envConfig.apiAuthBearer.authKey);
  }


  // Get user
  async getUser(): Promise<any> {
    const response = await this.get('/v4/user');
    return response;
  }

}