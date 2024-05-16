import { IOrderResponse } from '@app/models';

export interface ICustomerStoreState {
  isLoading: boolean;
  error: any;
  orders: IOrderResponse[] | null | undefined;
}
