import {
  IBackendSuccess,
  IColor,
  ICreateReview,
  IProduct,
  IProductCategory,
  IReview,
  ITag,
  ProductQueryType,
} from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const productActions = createActionGroup({
  source: '[Products]',
  events: {
    // GET ALL PRODUCTS

    'Get All Products': props<{ request?: ProductQueryType }>(),
    'Get All Products Success': props<{ response: IProduct[] }>(),
    'Get All Products Failure': props<{ error: any }>(),

    // GET SINGLE PRODUCT
    'Get Single Product': props<{ productId: string }>(),
    'Get Single Product Success': props<{ response: IProduct }>(),
    'Get Single Product Failure': props<{ error: any }>(),

    //PRODUCT CATEGORIES
    'Get Product Categories': emptyProps(),
    'Get Product Categories Success': props<{
      response: IProductCategory[];
    }>(),
    'Get Product Categories Failure': props<{ error: any }>(),

    //PRODUCT COLORS
    'Get Colors': emptyProps(),
    'Get Colors Success': props<{
      response: IColor[];
    }>(),
    'Get Colors Failure': props<{ error: any }>(),

    //PRODUCT TAGS
    'Get Tags': emptyProps(),
    'Get Tags Success': props<{
      response: ITag[];
    }>(),
    'Get Tags Failure': props<{ error: any }>(),

    //PRODUCT reviews
    'Delete Review': props<{ reviewId: string }>(),
    'Delete Review Success': props<{
      response: IReview;
    }>(),
    'Delete Review Failure': props<{ error: any }>(),

    'Create Review': props<{ request: ICreateReview }>(),
    'Create Review Success': props<{
      response: IReview;
    }>(),
    'Create Review Failure': props<{ error: any }>(),
  },
});
