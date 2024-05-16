import { Route } from '@angular/router';

export const auth_routes: Route[] = [
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        (C) => C.ForgotPasswordComponent
      ),
  },
  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(
        (C) => C.ResetPasswordComponent
      ),
  },
];
