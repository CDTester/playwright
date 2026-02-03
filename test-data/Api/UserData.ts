import { UtilsData } from '../UtilsData';

export class UserData extends UtilsData {
  static validUser = {
    email: 'test@example.com',
    password: 'Password123!',
  };

  static invalidUser = {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  };

}