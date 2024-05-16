import { IUser, UsersQueryType } from '@app/models';
import { createActionGroup, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: '[User]',
  events: {
    'Get All Users': props<{ request?: UsersQueryType }>(),
    'Get All Users Success': props<{ response: IUser[] }>(),
    'Get All Users Failure': props<{ error: any }>(),

    'Get Single User': props<{ userId: string }>(),
    'Get Single User Success': props<{ response: IUser }>(),
    'Get Single User Failure': props<{ error: any }>(),

    'Delete User': props<{ userId: string }>(),
    'Delete User Success': props<{ response: IUser }>(),
    'Delete User Failure': props<{ error: any }>(),

    'Block User': props<{ userId: string }>(),
    'Block User Success': props<{ response: IUser }>(),
    'Block User Failure': props<{ error: any }>(),

    'Unblock Block User': props<{ userId: string }>(),
    'Unblock Block User Success': props<{ response: IUser }>(),
    'Unblock Block User Failure': props<{ error: any }>(),
  },
});
