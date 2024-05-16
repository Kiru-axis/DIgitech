import { CustomerService } from '@app/core/services/customer.service';
import { customerActions } from './customer.actions';
import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  mergeMap,
  map,
  catchError,
  of,
  distinctUntilChanged,
  retry,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

// CART
export const geUserCartEffects = createEffect(
  (actions$ = inject(Actions), customerService = inject(CustomerService)) => {
    return actions$.pipe(
      ofType(customerActions.getCart),
      mergeMap(() =>
        customerService.getUserCart().pipe(
          map((response) => customerActions.getCartSuccess({ response })),
          catchError((error) => of(customerActions.getCartFailure({ error }))),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const addToCartEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.addToCart),
      mergeMap(({ request }) =>
        customerService.addToCart(request).pipe(
          map((response) => {
            toastr.success(`Product added to cart`);
            return customerActions.addToCartSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.addToCartFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const updateCartEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.updateCart),
      mergeMap(({ request }) =>
        customerService.updateCart(request).pipe(
          map((response) => {
            toastr.success(`Cart updated`);
            return customerActions.updateCartSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.updateCartFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const removeFromCartEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.removeProductFromCart),
      mergeMap(({ request }) =>
        customerService.removeProductFromCart(request).pipe(
          map((response) => {
            toastr.success(`Product removed from cart`);
            return customerActions.removeProductFromCartSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.removeProductFromCartFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const clearCartEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.clearCart),
      mergeMap(() =>
        customerService.clearCart().pipe(
          map((response) => {
            toastr.success(`Cart Cleared`);
            return customerActions.clearCartSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.clearCartFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

// ORDERS
export const createOrderEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.createOrder),
      mergeMap(({ request }) =>
        customerService.createOrder(request).pipe(
          map((response) => {
            toastr.success(`Order Created successfull`);
            window.location.href = response.url;
            console.log(response.url);

            return customerActions.createOrderSuccess({
              response: { url: response.url },
            });
          }),
          catchError((error) => {
            console.log(error);

            toastr.error(error.error.message, error.statusText);
            return of(customerActions.createOrderFailure({ error }));
          }),
          distinctUntilChanged(),
          retry(3)
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const getUserOrdersEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.getOrders),
      mergeMap(() =>
        customerService.getUserOrders().pipe(
          map((response) => {
            return customerActions.getOrdersSuccess({
              response,
            });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.getOrdersFailure({ error }));
          }),
          distinctUntilChanged(),
          retry(3)
        )
      )
    );
  },
  {
    functional: true,
  }
);

// WISHLIST
export const getWishlistEffects = createEffect(
  (actions$ = inject(Actions), customerService = inject(CustomerService)) => {
    return actions$.pipe(
      ofType(customerActions.getWishlist),
      mergeMap(() =>
        customerService.getWishlist().pipe(
          map((response) => customerActions.getWishlistSuccess({ response })),
          catchError((error) =>
            of(customerActions.getWishlistFailure({ error }))
          ),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const addToWishlistEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.addToWishlist),
      mergeMap(({ request }) =>
        customerService.addToWishlist({ productId: request.productId }).pipe(
          map((response) => {
            toastr.success(`Product added to wishlist`);
            return customerActions.addToWishlistSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.addToWishlistFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const removeFromWishlistEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.removeFromWishlist),
      mergeMap(({ request }) =>
        customerService
          .removeFromWishlist({ productId: request.productId })
          .pipe(
            map((response) => {
              toastr.success(`Product removed from wishlist`);
              return customerActions.removeFromWishlistSuccess({ response });
            }),
            catchError((error) => {
              toastr.error(error.error.message, error.statusText);
              return of(customerActions.removeFromWishlistFailure({ error }));
            }),
            distinctUntilChanged()
          )
      )
    );
  },
  {
    functional: true,
  }
);

export const clearWishlistEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.clearWishlist),
      mergeMap(() =>
        customerService.clearWishlist().pipe(
          map((response) => {
            toastr.success(`Wishlist Cleared`);
            return customerActions.clearWishlistSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.clearWishlistFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

// COMPARES
export const getComparesEffects = createEffect(
  (actions$ = inject(Actions), customerService = inject(CustomerService)) => {
    return actions$.pipe(
      ofType(customerActions.getCompares),
      mergeMap(() =>
        customerService.getCompares().pipe(
          map((response) => customerActions.getComparesSuccess({ response })),
          catchError((error) =>
            of(customerActions.getComparesFailure({ error }))
          ),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const addToComparesEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.addToCompare),
      mergeMap(({ request }) =>
        customerService.addToCompares({ productId: request.productId }).pipe(
          map((response) => {
            toastr.success(`Product added to compare list`);
            return customerActions.addToCompareSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.addToCompareFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const removeFromComparsEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.removeFromCompare),
      mergeMap(({ request }) =>
        customerService
          .removeFromCompares({ productId: request.productId })
          .pipe(
            map((response) => {
              toastr.success(`Product removed from compare list`);
              return customerActions.removeFromCompareSuccess({ response });
            }),
            catchError((error) => {
              toastr.error(error.error.message, error.statusText);
              return of(customerActions.removeFromCompareFailure({ error }));
            }),
            distinctUntilChanged()
          )
      )
    );
  },
  {
    functional: true,
  }
);

export const clearComparesEffects = createEffect(
  (
    actions$ = inject(Actions),
    customerService = inject(CustomerService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(customerActions.clearCompare),
      mergeMap(() =>
        customerService.clearCompares().pipe(
          map((response) => {
            toastr.success(`Compare list Cleared`);
            return customerActions.clearCompareSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(customerActions.clearCompareFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
