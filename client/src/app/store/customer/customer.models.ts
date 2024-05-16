import { ICart, ICompare, IOrder, IWishlist } from '@app/models';

export interface ICustomerStoreState {
  isLoading: boolean;
  error: any;
  wishlist: IWishlist[] | null | undefined;
  compares: ICompare[] | null | undefined;
  cart: ICart[] | null | undefined;
  orders: IOrder[] | null | undefined;
}
