import { IUser } from '@app/models';

export interface IAuthStoreState {
  isLoading: boolean;
  error: any;
  authUser: IUser | null | undefined;
}
