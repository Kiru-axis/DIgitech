import {
  IBackendSuccess,
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  IUser,
} from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActions = createActionGroup({
  source: '[Auth]',
  events: {
    Register: props<{ request: IRegister }>(),
    'Register Success': props<{ response: IBackendSuccess }>(),
    'Register Failure': props<{ error: any }>(),

    Login: props<{ request: ILogin }>(),
    'Login Success': props<{ response: IUser }>(),
    'Login Failure': props<{ error: any }>(),

    Logout: emptyProps(),
    'Logout Success': props<{ response: {} }>(),
    'Logout Failure': props<{ error: any }>(),

    RefreshToken: emptyProps(),
    'RefreshToken Success': props<{ response: IUser }>(),
    'RefreshToken Failure': props<{ error: any }>(),

    ResetPassword: props<{ request: { dto: IResetPassword; token: string } }>(),
    'ResetPassword Success': props<{ response: IBackendSuccess }>(),
    'ResetPassword Failure': props<{ error: any }>(),

    ForgotPassword: props<{
      request: IForgotPassword;
    }>(),
    'ForgotPassword Success': props<{ response: IBackendSuccess }>(),
    'ForgotPassword Failure': props<{ error: any }>(),
  },
});
