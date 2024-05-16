import {
  ApplicationConfig,
  enableProdMode,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt';

import { routes } from './app.routes';
import { environment } from '@environments/environment';

import { loaderInterceptor } from './shared';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

import { authFeatureName, authReducer } from './store/auth';
import * as authEffects from './store/auth/auth.effects';
import { productFeatureName, productReducer } from './store/products';
import * as productEffects from './store/products/products.effects';
import { blogFeatureName, blogReducer } from './store/blogs';
import * as blogEffects from './store/blogs/blogs.effects';
import { customerFeatureName, customerReducer } from './store/customer';
import * as customerEffects from './store/customer/customer.effects';
import { commonFeatureName, commonReducer } from './store/common';
import * as commonEffects from './store/common/common.effects';
import { userFeatureName, userReducer } from './store/user';
import * as userEffects from './store/user/user.effects';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withInterceptors([loaderInterceptor, jwtInterceptor, errorInterceptor])
    ),
    importProvidersFrom([
      ToastrModule.forRoot({
        preventDuplicates: true,
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      }),
      JwtModule.forRoot({
        config: {
          throwNoTokenError: true,
          tokenGetter() {
            const token = sessionStorage.getItem('token');
            return token ? JSON.parse(token) : null;
          },
        },
      }),
    ]),
    provideStore(),
    provideState(authFeatureName, authReducer),
    provideState(productFeatureName, productReducer),
    provideState(blogFeatureName, blogReducer),
    provideState(customerFeatureName, customerReducer),
    provideState(commonFeatureName, commonReducer),
    provideState(userFeatureName, userReducer),
    provideEffects([
      authEffects,
      productEffects,
      blogEffects,
      customerEffects,
      commonEffects,
      userEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
