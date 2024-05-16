import { Routes } from '@angular/router';

export const product_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shop/shop.component').then((C) => C.ShopComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./single-product/single-product.component').then(
        (C) => C.SingleProductComponent
      ),
  },
];
