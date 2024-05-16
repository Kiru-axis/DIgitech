import { createFeature, createReducer, on } from '@ngrx/store';
import { IAuthStoreState } from './auth.models';
import { authActions } from './auth.actions';

const initialState: IAuthStoreState = {
  error: null,
  isLoading: false,
  authUser: JSON.parse(sessionStorage.getItem('currentUser') as string),
};

const authFeature = createFeature({
  name: 'Auth',
  reducer: createReducer(
    initialState,

    // LOGIN
    on(authActions.login, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(authActions.loginSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        authUser: payload.response,
      };
    }),
    on(authActions.loginFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // LOGOUT
    on(authActions.logout, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(authActions.logoutSuccess, (state) => {
      return {
        ...state,
        isLoading: false,
        authUser: null,
      };
    }),
    on(authActions.logoutFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // REFRESH
    on(authActions.refreshToken, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(authActions.refreshTokenSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        authUser: payload.response,
      };
    }),
    on(authActions.refreshTokenFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // RESET PASSWORD
    on(authActions.resetPassword, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(authActions.resetPasswordSuccess, (state) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
    on(authActions.resetPasswordFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // FORGOT PASSWORD
    on(authActions.forgotPassword, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(authActions.forgotPasswordSuccess, (state) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
    on(authActions.forgotPasswordFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    })

    // S
  ),
});

export const {
  name: authFeatureName,
  reducer: authReducer,
  selectError,
  selectIsLoading,
  selectAuthUser,
} = authFeature;
