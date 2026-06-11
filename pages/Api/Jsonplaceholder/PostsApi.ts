import { BaseApi } from '../BaseApi';
import { UserSchema, UsersSchema } from '../../../test-data/Schemas/UsersSchema';
import { APIResponse } from 'playwright-core';

export class PostsApi extends BaseApi {
  readonly schemaUser = UserSchema;
  readonly schemaUsers = UsersSchema;

  constructor(envData: object) {
    super(envData['apiUsers']);
  }

  // Get all posts
  async getAllPosts(): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('GET', '/posts');

    return response;
  }


  // Get post (GET)
  async getPost(postId: string): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('GET', `/posts/${postId}`);
    return response;
  }

  /**
   * Create a post (POST)
   * @param formdata - {title: string, body: string, userId: number}
   * @returns - APIResponse
   */
  async createPost(data: any): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    this.setData(data);
    const response = await this.buildRequest('POST', '/posts');
    return response;
  }


  /**
   * Update a post (PUT)
   * @param postId id of the post to update
   * @param formdata {id: number, title: string, body: string, userId: number}
   * @returns APIResponse
   */ 
  async updatePost(postId: string, postData: object): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    this.setData(postData);
    const response = await this.buildRequest('PUT', `/posts/${postId}`);

    return response;
  }


  /**
   * patching a post (PATCH)
   * @param postId id of the post to update
   * @param formdata {title: string} or {body: string} or {userId: number}
   * @returns APIResponse
   */ 
  async patchPost(postId: string, postData: object): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    this.setData(postData);
    const response = await this.buildRequest('PATCH', `/posts/${postId}`);
    return response;
  }


  /**
   * deleting a post (DELETE)
   * @param postId id of the post to delete
   * @returns APIResponse
   */ 
  async deletePost(postId: string): Promise<APIResponse> {
    await this.init(); // Ensure the request context is initialized before making API calls
    const response = await this.buildRequest('DELETE', `/posts/${postId}`);

    return response;
  }
 
}