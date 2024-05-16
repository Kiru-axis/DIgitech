import { Route } from '@angular/router';
import { UserWishlistComponent } from './components/user-wishlist/user-wishlist.component';
import { UserCompareComponent } from './components/user-compare/user-compare.component';
import { ProfileComponent } from './profile/profile.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

export const profile_routes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: UserHomeComponent },
      { path: 'address', component: UserAddressComponent },
      { path: 'user-wishlist', component: UserWishlistComponent },
      { path: 'user-compares', component: UserCompareComponent },
      { path: 'user-orders', component: UserOrdersComponent },
    ],
  },
];
