import { createFeature, createReducer, on } from '@ngrx/store';
import { ICustomerStoreState } from './customer.models';
import { customerActions } from './customer.actions';
import { IOrderResponse } from '@app/models';

const initalState: ICustomerStoreState = {
  error: null,
  isLoading: false,
  orders: [],
};

const customerFeature = createFeature({
  name: 'Customer',
  reducer: createReducer(
    initalState,

    on(customerActions.getOrders, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.getOrdersSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: payload.response,
      };
    }),
    on(customerActions.getOrdersFailure, (state, payload) => {
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
  name: customerFeatureName,
  reducer: customerReducer,
  selectError,
  selectIsLoading,
  selectOrders,
} = customerFeature;
