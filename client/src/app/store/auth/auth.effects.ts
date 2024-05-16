import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { StorageService } from '@shared/services/storage.service';
import { authActions } from './auth.actions';

export const registerEffect = createEffect(
  (
    authService = inject(AuthService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((response) => {
            toastr.success(`Account created successfully`);
            return authActions.registerSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(authActions.registerFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap((data) => router.navigateByUrl('/auth/login'))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

// LOGIN

export const loginEffect = createEffect(
  (
    authService = inject(AuthService),
    actions$ = inject(Actions),
    storage = inject(StorageService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) =>
        authService.login(request).pipe(
          map((response) => {
            storage.set('currentUser', response);
            storage.set('token', response.token);
            return authActions.loginSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(authActions.loginFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterLoginSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap((data) => router.navigateByUrl('/profile'))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

// LOGOUT
export const logoutEffect = createEffect(
  (
    authService = inject(AuthService),
    actions$ = inject(Actions),
    storage = inject(StorageService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() =>
        authService.logout().pipe(
          map((d) => {
            storage.remove('currentUser');
            storage.remove('token');
            toastr.success('Logout success');
            return authActions.logoutSuccess({ response: d });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(authActions.logoutFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterLogoutSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.logoutSuccess),
      tap((_) => {
        router.navigateByUrl('/auth/login');
        // window.location.reload();
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

// REFRESH
export const refreshTokenEffect = createEffect(
  (
    authService = inject(AuthService),
    actions$ = inject(Actions),
    storage = inject(StorageService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(authActions.refreshToken),
      switchMap(() =>
        authService.refresh().pipe(
          map((response) => {
            // storage.set('currentUser', response);
            // storage.set('token', response.token);
            return authActions.refreshTokenSuccess({ response });
          }),
          catchError((error) => {
            console.log(error);

            toastr.error(error.error.message, error.statusText);
            return of(authActions.refreshTokenFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterRefreshSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.refreshTokenSuccess),
      tap((_) => router.navigateByUrl('/'))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

// RESET PASSWORD
export const resetPasswordEffect = createEffect(
  (
    authService = inject(AuthService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(authActions.resetPassword),
      switchMap(({ request: { dto, token } }) =>
        authService.resetPassword(dto, token).pipe(
          map((response) => {
            return authActions.resetPasswordSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(authActions.resetPasswordFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const redirectAfterResetSuccess = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.refreshTokenSuccess),
      tap((_) => router.navigateByUrl('/auth/login'))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

// RESET PASSWORD
export const forgotPasswordEffect = createEffect(
  (
    authService = inject(AuthService),
    actions$ = inject(Actions),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(authActions.forgotPassword),
      switchMap(({ request }) =>
        authService.forgotPassword(request).pipe(
          map((response) => {
            return authActions.forgotPasswordSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(authActions.forgotPasswordFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
