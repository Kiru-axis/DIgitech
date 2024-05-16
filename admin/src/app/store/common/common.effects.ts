import { inject } from '@angular/core';
import { CommonService } from '@app/core/services/common.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, distinctUntilChanged, map, mergeMap, of } from 'rxjs';
import { commonActions } from './common.actions';

// ENQUIRIES
export const getEnquiriesEffects = createEffect(
  (
    actions$ = inject(Actions),
    commonService = inject(CommonService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(commonActions.getAllEnquiries),
      mergeMap(() =>
        commonService.getAllEnquiries().pipe(
          map((response) => {
            return commonActions.getAllEnquiriesSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(commonActions.getAllEnquiriesFailure({ error }));
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

export const deleteEnquiryEffects = createEffect(
  (
    actions$ = inject(Actions),
    commonService = inject(CommonService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(commonActions.deleteEnquiry),
      mergeMap(({ enquiryId }) =>
        commonService.deleteEnquiry(enquiryId).pipe(
          map((response) => {
            toastr.success(`Enquiry Deleted`);
            return commonActions.deleteEnquirySuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(commonActions.deleteEnquiryFailure({ error }));
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

// COUPONS
export const getAllCouponsEffects = createEffect(
  (
    actions$ = inject(Actions),
    commonService = inject(CommonService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(commonActions.getAllCoupons),
      mergeMap(() =>
        commonService.getAllCoupons().pipe(
          map((response) => {
            return commonActions.getAllCouponsSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(commonActions.getAllCouponsFailure({ error }));
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

export const createCouponEffect = createEffect(
  (
    actions$ = inject(Actions),
    commonService = inject(CommonService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(commonActions.createCoupon),
      mergeMap(({ request }) =>
        commonService.createCoupon(request).pipe(
          map((response) => {
            toastr.success(`Coupon Created`);
            return commonActions.createCouponSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(commonActions.createCouponFailure({ error }));
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

export const deleteCouponEffect = createEffect(
  (
    actions$ = inject(Actions),
    commonService = inject(CommonService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(commonActions.deleteCoupon),
      mergeMap(({ couponId }) =>
        commonService.deleteCoupon(couponId).pipe(
          map((response) => {
            toastr.success(`Coupon Deleted`);
            return commonActions.deleteCouponSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(commonActions.deleteCouponFailure({ error }));
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
