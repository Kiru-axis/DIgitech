import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, switchMap } from 'rxjs';

import { UserService } from '@core/services/user.service';
import { StorageService } from '@app/shared/services/storage.service';
import { profileActions } from './profile.actions';

export const createAddressEffect = createEffect(
  (
    userService = inject(UserService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    storage = inject(StorageService)
  ) => {
    return actions$.pipe(
      ofType(profileActions.createAddress),
      switchMap(({ request }) => {
        return userService.createAddress(request).pipe(
          map((response) => {
            const authUser = storage.get('currentUser');
            storage.set('currentUser', Object.assign({}, authUser, response));
            toastr.success(`Address created successfully`);
            return profileActions.createAddressSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(profileActions.createAddressFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const updateAddressEffect = createEffect(
  (
    userService = inject(UserService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    storage = inject(StorageService)
  ) => {
    return actions$.pipe(
      ofType(profileActions.updateAddress),
      switchMap(({ request }) => {
        return userService.updateAddress(request).pipe(
          map((response) => {
            const authUser = storage.get('currentUser');
            storage.set('currentUser', Object.assign({}, authUser, response));

            toastr.success(`Address updated successfully`);
            return profileActions.updateAddressSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(profileActions.updateAddressFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const updateUserEffect = createEffect(
  (
    userService = inject(UserService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    storage = inject(StorageService)
  ) => {
    return actions$.pipe(
      ofType(profileActions.updateUser),
      switchMap(({ request }) => {
        return userService.updateUser(request).pipe(
          map((response) => {
            const authUser = storage.get('currentUser');
            storage.set('currentUser', Object.assign({}, authUser, response));
            toastr.success(`User profile updated successfully`);
            return profileActions.updateUserSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(profileActions.updateUserFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
