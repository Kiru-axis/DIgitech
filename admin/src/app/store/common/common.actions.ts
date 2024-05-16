import { ICoupon, ICreateCoupon, IEnquiry } from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const commonActions = createActionGroup({
  source: '[Common]',
  events: {
    //ENQUIRY
    'Get All Enquiries': emptyProps(),
    'Get All Enquiries Success': props<{ response: IEnquiry[] }>(),
    'Get All Enquiries Failure': props<{ error: any }>(),

    'Delete Enquiry': props<{ enquiryId: string }>(),
    'Delete Enquiry Success': props<{ response: IEnquiry }>(),
    'Delete Enquiry Failure': props<{ error: any }>(),

    //COUPONS
    'Get All Coupons': emptyProps(),
    'Get All Coupons Success': props<{ response: ICoupon[] }>(),
    'Get All Coupons Failure': props<{ error: any }>(),

    'Create Coupon': props<{ request: ICreateCoupon }>(),
    'Create Coupon Success': props<{ response: ICoupon }>(),
    'Create Coupon Failure': props<{ error: any }>(),

    'Delete Coupon': props<{ couponId: string }>(),
    'Delete Coupon Success': props<{ response: ICoupon }>(),
    'Delete Coupon Failure': props<{ error: any }>(),
  },
});
