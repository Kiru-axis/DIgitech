import { IUser } from '@app/models';

export interface IUserStoreState {
  isLoading: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  error: any;
  dbUsers: IUser[] | undefined | null;
  dbUser: IUser | undefined | null;
}
