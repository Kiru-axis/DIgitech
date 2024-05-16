import { Route } from '@angular/router';
import { CompareComponent } from './compare/compare.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const customer_routes: Route[] = [
  { path: 'wishlist', component: WishlistComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  // {
  //   path: 'profile',
  //   loadComponent: () =>
  //     import('./profile/profile.component').then((c) => c.ProfileComponent),
  //   children: [
  //     { path: '', component: UserHomeComponent },
  //     { path: 'user-wishlist', component: UserWishlistComponent },
  //     { path: 'user-compares', component: UserCompareComponent },
  //   ],
  // },
];
