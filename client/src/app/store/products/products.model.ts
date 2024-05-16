import { IColor, IProduct, IProductCategory, ITag } from '@app/models';

export interface IProductStoreState {
  isLoading: boolean;
  error: any;
  products: IProduct[];
  product: IProduct | null | undefined;
  productCategory: IProductCategory[] | null | undefined;
  tags: ITag[] | null | undefined;
  colors: IColor[] | null | undefined;
}
