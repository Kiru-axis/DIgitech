import { createFeature, createReducer, on } from '@ngrx/store';

import { IUserStoreState } from './user.model';
import { userActions } from './user.actions';
import { IUser } from '@app/models';

const initialState: IUserStoreState = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
  dbUser: null,
  dbUsers: [],
};
const userFeature = createFeature({
  name: 'User',
  reducer: createReducer(
    initialState,

    // ALL USERS

    on(userActions.getAllUsers, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(userActions.getAllUsersSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        dbUsers: payload.response,
      };
    }),
    on(userActions.getAllUsersFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    // SINGLE USERS

    on(userActions.getSingleUser, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(userActions.getSingleUserSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        dbUser: payload.response,
      };
    }),
    on(userActions.getSingleUserFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    // DELETE USER

    on(userActions.deleteUser, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(userActions.deleteUserSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        dbUser: state?.dbUser?.id === payload.response.id ? null : state.dbUser,
        dbUsers: state.dbUsers?.filter(
          (user) => user.id !== payload.response.id
        ),
      };
    }),
    on(userActions.deleteUserFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    // BLOCK USER

    on(userActions.blockUser, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(userActions.blockUserSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        dbUser:
          state?.dbUser?.id === payload.response.id
            ? payload.response
            : state.dbUser,
        dbUsers: state.dbUsers?.map((user) =>
          user.id === payload.response.id
            ? Object.assign({}, user, payload.response)
            : user
        ),
      };
    }),
    on(userActions.blockUserFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    // BLOCK USER

    on(userActions.unblockBlockUser, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(userActions.unblockBlockUserSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        dbUser:
          state?.dbUser?.id === payload.response.id
            ? payload.response
            : state.dbUser,
        dbUsers: state.dbUsers?.map((user) =>
          user.id === payload.response.id
            ? Object.assign({}, user, payload.response)
            : user
        ),
      };
    }),
    on(userActions.unblockBlockUserFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    })
  ),
});

export const {
  name: userFeatureName,
  reducer: userReducer,
  selectDbUser,
  selectDbUsers,
  selectIsLoading,
  selectError,
} = userFeature;
