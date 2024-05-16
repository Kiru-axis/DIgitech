import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, switchMap } from 'rxjs';

import { userActions } from './user.actions';
import { IUser } from '@app/models';
import { UserService } from '@app/core/services/user.service';

export const getUsersEffect = createEffect(
  (
    toastr = inject(ToastrService),
    userService = inject(UserService),
    actions$ = inject(Actions)
  ) => {
    return actions$.pipe(
      ofType(userActions.getAllUsers),
      switchMap(({ request }) => {
        return userService.getAllUsers(request).pipe(
          map((response) => {
            return userActions.getAllUsersSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(userActions.getAllUsersFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const getSingleUserEffect = createEffect(
  (
    toastr = inject(ToastrService),
    userService = inject(UserService),
    actions$ = inject(Actions)
  ) => {
    return actions$.pipe(
      ofType(userActions.getSingleUser),
      switchMap(({ userId }) => {
        return userService.getSingleUser(userId).pipe(
          map((response) => {
            return userActions.getSingleUserSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(userActions.getSingleUserFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const blockUserEffect = createEffect(
  (
    userService = inject(UserService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(userActions.blockUser),
      switchMap(({ userId }) => {
        return userService.blockUser(userId).pipe(
          map((response) => {
            toastr.success(`User blocked`);
            return userActions.blockUserSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(userActions.blockUserFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const unblockUserEffect = createEffect(
  (
    userService = inject(UserService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(userActions.unblockBlockUser),
      switchMap(({ userId }) => {
        return userService.unblockUser(userId).pipe(
          map((response) => {
            toastr.success(`User unblocked`);
            return userActions.unblockBlockUserSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(userActions.unblockBlockUserFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteUserEffect = createEffect(
  (
    userService = inject(UserService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(userActions.deleteUser),
      switchMap(({ userId }) => {
        return userService.deleteUser(userId).pipe(
          map((response) => {
            toastr.success(`User deleted`);
            return userActions.deleteUserSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(userActions.deleteUserFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
