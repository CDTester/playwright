import { UtilsData } from '../../UtilsData';

export class HerokuappData extends UtilsData {
  static validUser = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  };
 
  static invalidUser = {
    username: 'johnDoe',
    password: 'LetMeIn',
  };
 
}