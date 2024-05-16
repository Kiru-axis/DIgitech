import { Routes } from '@angular/router';
import { authGuard, loggedGuard } from './core';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    canActivate: [loggedGuard], // prevents logged in users from going to these pages
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((R) => R.auth_routes),
      },
      { path: 'auth/login', component: LoginComponent },
    ],
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/enquiry/enquiry.component').then(
        (C) => C.EnquiryComponent
      ),
  },
  {
    path: 'policies',
    loadChildren: () =>
      import('./pages/policies/policy.routes').then((R) => R.policy_routes),
  },
  {
    path: 'store',
    loadChildren: () =>
      import('./pages/products/product.routes').then((R) => R.product_routes),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./pages/blogs/blog.routes').then((r) => r.blog_routes),
  },
  {
    path: 'customer',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/customer/customer.routes').then((r) => r.customer_routes),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/profile/profile.routes').then((r) => r.profile_routes),
  },
];
