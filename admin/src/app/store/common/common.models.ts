import { ICoupon, IEnquiry } from '@app/models';

export interface ICommonStoreState {
  isLoading: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  error: any;
  enquiries: IEnquiry[] | undefined | null;
  coupons: ICoupon[] | undefined | null;
}
