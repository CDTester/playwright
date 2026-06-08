import { BaseApi } from '../BaseApi';
import { UserSchema, UsersSchema } from '../../../test-data/Schemas/UsersSchema';
import { APIResponse } from '../../../fixtures/apiFixture';

export class UsersApi extends BaseApi {
  readonly schemaUser = UserSchema;
  readonly schemaUsers = UsersSchema;
  private config: any;

  constructor(envData: any) {
    super(envData.apiUsers);
  }

  // Get all users
  async getAllUsers(): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('GET', '/users');
    return response;
  }

  // Get user by ID
  async getUserById(userId: string): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('GET', `/users/${userId}`);
    return response;
  }

  // Get user by username
  async getUserByUsername(username: string): Promise<APIResponse> {
    this.setParams({ "username": username });
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('GET', '/users');
    return response;
  }

  // Get user by city
  async getUserByCity(city: string): Promise<APIResponse> {
    this.setParams({ "address.city": city });
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('GET', '/users');
    return response;
  }

}