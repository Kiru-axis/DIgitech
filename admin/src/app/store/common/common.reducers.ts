import { createFeature, createReducer, on } from '@ngrx/store';
import { ICommonStoreState } from './common.models';
import { commonActions } from './common.actions';
import { ICoupon } from '@app/models';

const initialState: ICommonStoreState = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
  enquiries: [],
  coupons: [],
};

const commonFeature = createFeature({
  name: 'Common',
  reducer: createReducer(
    initialState,
    // GET Enquiries
    on(commonActions.getAllEnquiries, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(commonActions.getAllEnquiriesSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        enquiries: payload.response,
      };
    }),
    on(commonActions.getAllEnquiriesFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    on(commonActions.deleteEnquiry, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(commonActions.deleteEnquirySuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        enquiries: state.enquiries?.filter(
          (enq) => enq.id !== payload.response.id
        ),
      };
    }),
    on(commonActions.deleteEnquiryFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    // COUPONS
    on(commonActions.getAllCoupons, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(commonActions.getAllCouponsSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        coupons: payload.response,
      };
    }),
    on(commonActions.getAllCouponsFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    on(commonActions.createCoupon, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(commonActions.createCouponSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        coupons: [...(state.coupons as ICoupon[]), payload.response],
      };
    }),
    on(commonActions.createCouponFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    }),

    on(commonActions.deleteCoupon, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(commonActions.deleteCouponSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        coupons: state.coupons?.filter((enq) => enq.id !== payload.response.id),
      };
    }),
    on(commonActions.deleteCouponFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: payload.error,
      };
    })
  ),
});

export const {
  name: commonFeatureName,
  reducer: commonReducer,
  selectCoupons,
  selectError,
  selectEnquiries,
} = commonFeature;
