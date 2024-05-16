import { ICreateAddress, IUpdateUser, IUser } from '@app/models';
import { createActionGroup, props } from '@ngrx/store';

export const profileActions = createActionGroup({
  source: '[Profile]',
  events: {
    'Create Address': props<{ request: ICreateAddress }>(),
    'Create Address Success': props<{ response: IUser }>(),
    'Create Address Failure': props<{ error: any }>(),

    'Update Address': props<{ request: Partial<ICreateAddress> }>(),
    'Update Address Success': props<{ response: IUser }>(),
    'Update Address Failure': props<{ error: any }>(),

    'Update User': props<{ request: Partial<IUpdateUser> }>(),
    'Update User Success': props<{ response: IUser }>(),
    'Update User Failure': props<{ error: any }>(),
  },
});
