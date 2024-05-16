import {
  IColor,
  ICreateProduct,
  IProduct,
  IProductBrand,
  IProductCategory,
  ITag,
  ICreateCommonProductSup,
  ProductQueryType,
} from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const productActions = createActionGroup({
  source: '[Products]',
  events: {
    //  PRODUCTS

    'Create Product': props<{ request: ICreateProduct }>(),
    'Create Product Success': props<{ response: IProduct }>(),
    'Create Product Failure': props<{ error: any }>(),

    'update Product': props<{
      request: { dto: Partial<IProduct>; productId: string };
    }>(),
    'update Product Success': props<{ response: IProduct }>(),
    'update Product Failure': props<{ error: any }>(),

    'Delete Product': props<{ request: { productId: string } }>(),
    'Delete Product Success': props<{ response: IProduct }>(),
    'Delete Product Failure': props<{ error: any }>(),

    'Get All Products': props<{ request?: ProductQueryType }>(),
    'Get All Products Success': props<{ response: IProduct[] }>(),
    'Get All Products Failure': props<{ error: any }>(),

    'Get Single Product': props<{ productId: string }>(),
    'Get Single Product Success': props<{ response: IProduct }>(),
    'Get Single Product Failure': props<{ error: any }>(),

    //PRODUCT CATEGORIES
    'Get Product Categories': emptyProps(),
    'Get Product Categories Success': props<{
      response: IProductCategory[];
    }>(),
    'Get Product Categories Failure': props<{ error: any }>(),

    'Create Product Category': props<{ request: ICreateCommonProductSup }>(),
    'Create Product Category Success': props<{ response: IProductCategory }>(),
    'Create Product Category Failure': props<{ error: any }>(),

    'Delete Product Category': props<{ request: { categoryId: string } }>(),
    'Delete Product Category Success': props<{ response: IProductCategory }>(),
    'Delete Product Category Failure': props<{ error: any }>(),

    //PRODUCT COLORS
    'Get Colors': emptyProps(),
    'Get Colors Success': props<{
      response: IColor[];
    }>(),
    'Get Colors Failure': props<{ error: any }>(),

    'Create Color': props<{ request: ICreateCommonProductSup }>(),
    'Create Color Success': props<{ response: IColor }>(),
    'Create Color Failure': props<{ error: any }>(),

    'Delete Color': props<{ request: { colorId: string } }>(),
    'Delete Color Success': props<{ response: IColor }>(),
    'Delete Color Failure': props<{ error: any }>(),

    //PRODUCT TAGS
    'Get Tags': emptyProps(),
    'Get Tags Success': props<{
      response: ITag[];
    }>(),
    'Get Tags Failure': props<{ error: any }>(),

    'Create Tag': props<{ request: ICreateCommonProductSup }>(),
    'Create Tag Success': props<{ response: ITag }>(),
    'Create Tag Failure': props<{ error: any }>(),

    'Delete Tag': props<{ request: { tagId: string } }>(),
    'Delete Tag Success': props<{ response: ITag }>(),
    'Delete Tag Failure': props<{ error: any }>(),

    //PRODUCT BRANDS
    'Get Brands': emptyProps(),
    'Get Brands Success': props<{
      response: IProductBrand[];
    }>(),
    'Get Brands Failure': props<{ error: any }>(),

    'Create Brand': props<{ request: ICreateCommonProductSup }>(),
    'Create Brand Success': props<{ response: IProductBrand }>(),
    'Create Brand Failure': props<{ error: any }>(),

    'Delete Brand': props<{ request: { brandId: string } }>(),
    'Delete Brand Success': props<{ response: IProductBrand }>(),
    'Delete Brand Failure': props<{ error: any }>(),
  },
});
