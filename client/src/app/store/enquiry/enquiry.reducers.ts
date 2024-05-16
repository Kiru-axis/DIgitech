import { createFeature, createReducer, on } from '@ngrx/store';
import { IEnquiryStoreState } from './enquiry.models';
import { enquiryActions } from './enquiry.actions';

const initialState: IEnquiryStoreState = {
  isLoading: false,
  error: null,
};

const enquiryFeature = createFeature({
  name: 'Enquiry',
  reducer: createReducer(
    initialState,
    // GET ALL Blogs
    on(enquiryActions.createEnquiry, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(enquiryActions.createEnquirySuccess, (state) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
    on(enquiryActions.createEnquiryFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    })
  ),
});

export const { name: enquiryFeatureName, reducer: enquiryReducer } =
  enquiryFeature;
