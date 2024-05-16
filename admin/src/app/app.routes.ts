import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { loggedGuard } from './core/guards/logged.guard';
import { roleGuard } from './core/guards/role.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  {
    path: '',
    canActivate: [loggedGuard],
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
    path: 'home',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      requiredRole: 'ADMIN',
    },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (c) => c.ProductComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.component').then((c) => c.UsersComponent),
      },
      {
        path: 'users/:id',
        loadComponent: () =>
          import('./pages/user/user.component').then((c) => c.UserComponent),
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('./pages/tags/tags.component').then((c) => c.TagsComponent),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'colors',
        loadComponent: () =>
          import('./pages/colors/colors.component').then(
            (c) => c.ColorsComponent
          ),
      },
      {
        path: 'coupons',
        loadComponent: () =>
          import('./pages/common/coupons/coupons.component').then(
            (c) => c.CouponsComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then(
            (c) => c.OrdersComponent
          ),
      },
      {
        path: 'enquiries',
        loadComponent: () =>
          import('./pages/common/enquiries/enquiries.component').then(
            (c) => c.EnquiriesComponent
          ),
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/blogs/blogs.component').then((c) => c.BlogsComponent),
      },

      {
        path: 'blog-categories',
        loadComponent: () =>
          import('./pages/blog-categories/blog-categories.component').then(
            (c) => c.BlogCategoriesComponent
          ),
      },
    ],
  },
];
