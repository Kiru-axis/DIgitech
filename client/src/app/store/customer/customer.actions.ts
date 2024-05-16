import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
  IBulkDeleteResponse,
  ICart,
  ICompare,
  ICreateCart,
  ICreateCompare,
  ICreateOrder,
  ICreateWishlist,
  IDeleteCartProduct,
  IOrder,
  IUpdateCart,
  IWishlist,
} from '@app/models';

export const customerActions = createActionGroup({
  source: '[Customer]',
  events: {
    // CART
    'Get Cart': emptyProps(),
    'Get Cart Success': props<{ response: ICart[] }>(),
    'Get Cart Failure': props<{ error: any }>(),

    'Add To Cart': props<{ request: ICreateCart }>(),
    'Add To Cart Success': props<{ response: ICart }>(),
    'Add To Cart Failure': props<{ error: any }>(),

    'Update Cart': props<{ request: IUpdateCart }>(),
    'Update Cart Success': props<{ response: ICart }>(),
    'Update Cart Failure': props<{ error: any }>(),

    'Remove Product From Cart': props<{ request: IDeleteCartProduct }>(),
    'Remove Product From Cart Success': props<{ response: ICart }>(),
    'Remove Product From Cart Failure': props<{ error: any }>(),

    'Clear Cart': emptyProps(),
    'Clear Cart Success': props<{ response: IBulkDeleteResponse }>(),
    'Clear Cart Failure': props<{ error: any }>(),

    // ORDER
    'Create Order': props<{ request?: ICreateOrder }>(),
    'Create Order Success': props<{ response: { url: string } }>(),
    'Create Order Failure': props<{ error: any }>(),

    'Get Orders': emptyProps(),
    'Get Orders Success': props<{ response: IOrder[] }>(),
    'Get Orders Failure': props<{ error: any }>(),

    // WISHLISTS
    'Get Wishlist': emptyProps(),
    'Get Wishlist Success': props<{ response: IWishlist[] }>(),
    'Get Wishlist Failure': props<{ error: any }>(),

    'Add To Wishlist': props<{ request: ICreateWishlist }>(),
    'Add To Wishlist Success': props<{ response: IWishlist }>(),
    'Add To Wishlist Failure': props<{ error: any }>(),

    'Remove From Wishlist': props<{ request: ICreateWishlist }>(),
    'Remove From Wishlist Success': props<{ response: IWishlist }>(),
    'Remove From Wishlist Failure': props<{ error: any }>(),

    'Clear Wishlist': emptyProps(),
    'Clear Wishlist Success': props<{ response: IBulkDeleteResponse }>(),
    'Clear Wishlist Failure': props<{ error: any }>(),

    // COMPARES
    'Get Compares': emptyProps(),
    'Get Compares Success': props<{ response: ICompare[] }>(),
    'Get Compares Failure': props<{ error: any }>(),

    'Add To Compare': props<{ request: ICreateCompare }>(),
    'Add To Compare Success': props<{ response: ICompare }>(),
    'Add To Compare Failure': props<{ error: any }>(),

    'Remove From Compare': props<{ request: ICreateCompare }>(),
    'Remove From Compare Success': props<{ response: ICompare }>(),
    'Remove From Compare Failure': props<{ error: any }>(),

    'Clear Compare': emptyProps(),
    'Clear Compare Success': props<{ response: IBulkDeleteResponse }>(),
    'Clear Compare Failure': props<{ error: any }>(),
  },
});
