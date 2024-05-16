import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = inject(JwtHelperService);
  const token = jwt.tokenGetter();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      responseType: 'json',
    });
  }

  // console.log(req.headers.get('Authorization'));

  return next(req);
};
