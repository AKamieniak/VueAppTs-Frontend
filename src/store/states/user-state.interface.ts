import { IUser } from '@/interfaces/user.interface';

export interface IUserState {
  user: IUser | null;
  token: string;
}
