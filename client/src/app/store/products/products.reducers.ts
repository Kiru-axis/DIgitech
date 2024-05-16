import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { IProductStoreState } from './products.model';
import { productActions } from './products.actions';
import { IReview } from '@app/models';

const initialState: IProductStoreState = {
  isLoading: false,
  error: null,
  product: null,
  products: [],
  productCategory: [],
  colors: [],
  tags: [],
};

const productFeature = createFeature({
  name: 'Products',
  reducer: createReducer(
    initialState,
    // GET ALL PRODUCTS
    on(productActions.getAllProducts, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.getAllProductsSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        products: payload.response,
      };
    }),
    on(productActions.getAllProductsFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // GET SINGLE PRODUCT
    on(productActions.getSingleProduct, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(productActions.getSingleProductSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        product: payload.response,
      };
    }),
    on(productActions.getSingleProductFailure, (state, payload) => {
      return { ...state, isLoading: false, error: payload.error };
    }),

    // GET ALL PRODUCT CATEGORIES
    on(productActions.getProductCategories, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.getProductCategoriesSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        productCategory: payload.response,
      };
    }),
    on(productActions.getProductCategoriesFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),
    // GET ALL Tags
    on(productActions.getTags, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.getTagsSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        tags: payload.response,
      };
    }),
    on(productActions.getTagsFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // GET ALL Colors
    on(productActions.getColors, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.getColorsSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        colors: payload.response,
      };
    }),
    on(productActions.getColorsFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),
    on(productActions.createReview, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.createReviewSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        products: state.products?.map((prod) => {
          return {
            ...prod,
            Reviews: [...(prod.Reviews as IReview[]), payload.response],
          };
        }),
        product: Object.assign({}, state.product, {
          ...state.product,
          Reviews: [...(state.product?.Reviews as IReview[]), payload.response],
        }),
      };
    }),
    on(productActions.createReviewFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.deleteReview, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.deleteReviewSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        products: state.products?.map((prod) => {
          return {
            ...prod,
            Reviews: prod.Reviews?.filter((x) => x.id !== payload.response.id),
          };
        }),
        product: Object.assign({}, state.product, {
          ...state.product,
          Reviews: state.product?.Reviews?.filter(
            (x) => x.id !== payload.response.id
          ),
        }),
      };
    }),
    on(productActions.createReviewFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    })
  ),
  extraSelectors: ({ selectProducts }) => ({
    selectSpecialProducts: createSelector(selectProducts, (state) =>
      state.filter((p) => p.Tags.some((c) => c.name.includes('special')))
    ),
  }),
});

export const {
  name: productFeatureName,
  reducer: productReducer,
  selectError,
  selectIsLoading,
  selectProduct,
  selectProducts,
  selectSpecialProducts,
  selectProductCategory,
  selectColors,
  selectTags,
} = productFeature;
