import { Route } from '@angular/router';

export const policy_routes: Route[] = [
  {
    path: 'refund',
    loadComponent: () =>
      import('./refund/refund.component').then((c) => c.RefundComponent),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./privacy/privacy.component').then((c) => c.PrivacyComponent),
  },
  {
    path: 'shipping',
    loadComponent: () =>
      import('./shipping/shipping.component').then((c) => c.ShippingComponent),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./terms-policy/terms-policy.component').then(
        (c) => c.TermsPolicyComponent
      ),
  },
];
