import { inject } from '@angular/core';
import { EnquiryService } from '@app/core/services/enquiry.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, distinctUntilChanged, map, mergeMap, of } from 'rxjs';
import { enquiryActions } from './enquiry.actions';

export const createEnquiryEffects = createEffect(
  (
    actions$ = inject(Actions),
    enquiryService = inject(EnquiryService),
    toastr = inject(ToastrService)
  ) => {
    return actions$.pipe(
      ofType(enquiryActions.createEnquiry),
      mergeMap(({ request }) =>
        enquiryService.createEnquiry(request).pipe(
          map((response) => {
            toastr.success(`Your Enquiry has been created`);
            return enquiryActions.createEnquirySuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(enquiryActions.createEnquiryFailure({ error }));
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
