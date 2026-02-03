import { BaseApi } from '../BaseApi';
import envData from '../../../utils/loadEnvData';
import { UserSchema, UsersSchema } from '../../../test-data/Schemas/UsersSchema';

export class PostsApi extends BaseApi {
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


  // Get all posts
  async getAllPosts(): Promise<any> {
    const response = await this.get('/posts');
    return response;
  }


  // Get post (GET)
  async getPost(postId: string): Promise<any> {
    const response = await this.get(`/posts/${postId}`);
    return response;
  }

  /**
   * Create a post (POST)
   * @param formdata - {title: string, body: string, userId: number}
   * @returns - APIResponse
   */
  async createPost(data: any): Promise<any> {
    const response = await this.post('/posts', { data: data });
    return response;
  }


  /**
   * Update a post (PUT)
   * @param postId id of the post to update
   * @param formdata {id: number, title: string, body: string, userId: number}
   * @returns APIResponse
   */ 
  async updatePost(postId: string, postData: any): Promise<any> {
    const response = await this.put(`/posts/${postId}`, { data: postData });
    return response;
  }


  /**
   * patching a post (PATCH)
   * @param postId id of the post to update
   * @param formdata {title: string} or {body: string} or {userId: number}
   * @returns APIResponse
   */ 
  async patchPost(postId: string, postData: any): Promise<any> {
    const response = await this.patch(`/posts/${postId}`, { data: postData });
    return response;
  }


  /**
   * deleting a post (DELETE)
   * @param postId id of the post to delete
   * @returns APIResponse
   */ 
  async deletePost(postId: string): Promise<any> {
    const response = await this.delete(`/posts/${postId}`);
    return response;
  }
 
}