import { createFeature, createReducer, on } from '@ngrx/store';

import { IUser } from '@app/models';
import { IProfileStoreState } from './profile.model';
import { profileActions } from './profile.actions';

// function addressHandler(user: IUser | null | undefined, address: IAddress) {
//   let found = { ...user } as IUser;
//   const add = found.Address;
//   const pushed = Object.assign({}, add, address);
//   found.Address = pushed;
//   return found;
// }

const initialState: IProfileStoreState = {
  isLoading: false,
  // currentUser: JSON.parse(sessionStorage.getItem('currentUser') as string),
  error: null,
};
const profileFeature = createFeature({
  name: 'Profile',
  reducer: createReducer(
    initialState,
    on(profileActions.createAddress, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(profileActions.createAddressSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        // currentUser:
        //   state.currentUser?.id === payload.response.id
        //     ? Object.assign({}, state.currentUser, payload.response)
        //     : state.currentUser,
      };
    }),
    on(profileActions.createAddressFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // Updates
    on(profileActions.updateAddress, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(profileActions.updateAddressSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        // currentUser:
        //   state.currentUser?.id === payload.response.id
        //     ? Object.assign({}, state.currentUser, payload.response)
        //     : state.currentUser,
      };
    }),
    on(profileActions.updateAddressFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(profileActions.updateUser, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }),
    on(profileActions.updateUserSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        // currentUser:
        //   state.currentUser?.id === payload.response.id
        //     ? Object.assign({}, state.currentUser, payload.response)
        //     : state.currentUser,
      };
    }),
    on(profileActions.updateUserFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    })
  ),
});

export const {
  name: profileFeatureName,
  reducer: profileReducer,
  // selectCurrentUser,
  selectError,
} = profileFeature;
