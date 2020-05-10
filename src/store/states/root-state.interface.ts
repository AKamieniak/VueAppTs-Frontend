import { IGalleryState } from './gallery-state.interface';
import { IGlobalsState } from './globals-state.interface';
import { IUserState } from './user-state.interface';

export interface IRootState {
  user: IUserState;
  gallery: IGalleryState;
  globals: IGlobalsState;
}
