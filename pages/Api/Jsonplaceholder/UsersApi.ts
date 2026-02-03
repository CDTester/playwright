import { BaseApi } from '../BaseApi';
import envData from '../../../utils/loadEnvData';
import { UserSchema, UsersSchema } from '../../../test-data/Schemas/UsersSchema';

export class UsersApi extends BaseApi {
  readonly schemaUser = UserSchema;
  readonly schemaUsers = UsersSchema;


  constructor() {
    const env = new envData('UserApi');
    const envConfig = env.getEnvData as any;
    const baseURL = envConfig.apiUsers.baseUrl;
    const headers = { 
      "connection": "keep-alive", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Cache-Control": "no-cache" 
    };
    super(baseURL, headers);
  }


  // Get all users
  async getAllUsers(): Promise<any> {
    const response = await this.get('/users');
    return response;
  }

  // Get user by ID
  async getUserById(userId: string): Promise<any> {
    const response = await this.get(`/users/${userId}`);
    return response;
  }

  // Get user by username
  async getUserByUsername(username: string): Promise<any> {
    const response =  await this.get('/users', { params: { "username": username } });
    return response;
  }

  // Get user by username
  async getUserByCity(city: string): Promise<any> {
    const response =  await this.get('/users', { params: { "address.city": city } });
    return response;
  }

}