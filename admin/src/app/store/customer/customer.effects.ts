import { CustomerService } from '@app/core/services/customer.service';
import { customerActions } from './customer.actions';
import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinctUntilChanged } from 'rxjs';

export const getOrdersEffects = createEffect(
  (actions$ = inject(Actions), customerService = inject(CustomerService)) => {
    return actions$.pipe(
      ofType(customerActions.getOrders),
      mergeMap(({ request }) =>
        customerService.getOrders(request).pipe(
          map((response) => customerActions.getOrdersSuccess({ response })),
          catchError((error) =>
            of(customerActions.getOrdersFailure({ error }))
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
