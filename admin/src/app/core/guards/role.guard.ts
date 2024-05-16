import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const roleGuard: CanActivateFn = (route, state) => {
  const jwt = inject(JwtHelperService);
  const decode = jwt.decodeToken();
  if (decode.role !== route.data['requiredRole']) {
    return false;
  }

  return true;
};
