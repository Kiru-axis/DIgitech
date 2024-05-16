import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ICustomerStoreState } from './customer.models';
import { customerActions } from './customer.actions';
import { ICart, ICompare, IOrder, IWishlist } from '@app/models';

function updateCart(carts: ICart[] | undefined | null, update: ICart) {
  const data = [...(carts as ICart[])];
  return data.map((x) => {
    const newData = x.id === update.id ? Object.assign({}, x, update) : x;
    return newData;
  });
}

const initalState: ICustomerStoreState = {
  error: null,
  isLoading: false,
  wishlist: [],
  compares: [],
  cart: [],
  orders: [],
};

const customerFeature = createFeature({
  name: 'Customer',
  reducer: createReducer(
    initalState,

    // CART
    on(customerActions.getCart, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.getCartSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        cart: payload.response,
      };
    }),
    on(customerActions.getCartFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.addToCart, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.addToCartSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        cart: [...(state.cart as ICart[]), payload.response],
      };
    }),
    on(customerActions.addToCartFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.updateCart, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.updateCartSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        cart: updateCart(state.cart, payload.response),
      };
    }),
    on(customerActions.updateCartFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.removeProductFromCart, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.removeProductFromCartSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        cart: state.cart?.filter((c) => c.id !== payload.response.id),
      };
    }),
    on(customerActions.removeProductFromCartFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.clearCart, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.clearCartSuccess, (state) => {
      return { ...state, isLoading: false, isSuccess: true, cart: [] };
    }),
    on(customerActions.clearCartFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // orders
    on(customerActions.createOrder, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.createOrderSuccess, (state) => {
      return {
        ...state,
        isLoading: false,
        // orders: [...(state.orders as IOrder[]), payload.response],
      };
    }),
    on(customerActions.createOrderFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.getOrders, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.getOrdersSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        orders: payload.response,
      };
    }),
    on(customerActions.getOrdersFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // WISHLIST
    on(customerActions.getWishlist, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.getWishlistSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        wishlist: payload.response,
      };
    }),
    on(customerActions.getWishlistFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.addToWishlist, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.addToWishlistSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        wishlist: [...(state.wishlist as IWishlist[]), payload.response],
      };
    }),
    on(customerActions.addToWishlistFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.removeFromWishlist, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.removeFromWishlistSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        wishlist: state.wishlist?.filter((x) => x.id !== payload.response.id),
      };
    }),
    on(customerActions.removeFromWishlistFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.clearWishlist, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.clearWishlistSuccess, (state) => {
      return { ...state, isLoading: false, isSuccess: true, wishlist: [] };
    }),
    on(customerActions.clearWishlistFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // COMPARE LIST
    on(customerActions.getCompares, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.getComparesSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        compares: payload.response,
      };
    }),
    on(customerActions.getComparesFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.addToCompare, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.addToCompareSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        compares: [...(state.compares as ICompare[]), payload.response],
      };
    }),
    on(customerActions.addToCompareFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.removeFromCompare, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.removeFromCompareSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        compares: state.compares?.filter((x) => x.id !== payload.response.id),
      };
    }),
    on(customerActions.removeFromCompareFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(customerActions.clearCompare, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(customerActions.clearCompareSuccess, (state) => {
      return { ...state, isLoading: false, isSuccess: true, compares: [] };
    }),
    on(customerActions.clearCompareFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    })
  ),
  extraSelectors: ({ selectCart }) => ({
    selectCartData: createSelector(selectCart, (cart) => {
      return {
        quantity: cart?.map((p) => p.quantity).reduce((a, b) => a + b, 0) || 0,
        totalPrice:
          cart?.map((x) => x.price * x.quantity).reduce((a, b) => a + b, 0) ||
          0,

        cart,
      };
    }),
  }),
});

export const {
  name: customerFeatureName,
  reducer: customerReducer,
  selectError,
  selectIsLoading,
  selectWishlist,
  selectCompares,
  selectCartData,
  selectOrders,
} = customerFeature;
