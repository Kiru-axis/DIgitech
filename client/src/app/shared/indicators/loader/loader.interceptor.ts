import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  // Check for a custom attribute
  // to avoid showing loading spinner
  if (req.context.get(SkipLoading)) {
    // Pass the request directly to the next handler
    return next(req);
  }

  // Turn on the loading spinner
  loaderService.showLoading();

  return next(req).pipe(
    finalize(() => {
      // Turn off the loading spinner
      loaderService.hideLoading();
    })
  );
};
