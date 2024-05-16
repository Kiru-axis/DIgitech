import { IBackendSuccess, ICreateEnquiry } from '@app/models';
import { createActionGroup, props } from '@ngrx/store';

export const enquiryActions = createActionGroup({
  source: '[Enquiry]',
  events: {
    //CREATE ENQUIRY
    'Create Enquiry': props<{ request: ICreateEnquiry }>(),
    'Create Enquiry Success': props<{ response: IBackendSuccess }>(),
    'Create Enquiry Failure': props<{ error: any }>(),
  },
});
