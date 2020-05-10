import { IUser } from './user.interface';

export interface IAuthResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  user: IUser;
}
