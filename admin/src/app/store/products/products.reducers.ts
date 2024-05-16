import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { IProductStoreState } from './products.model';
import { productActions } from './products.actions';
import {
  IColor,
  IProduct,
  IProductBrand,
  IProductCategory,
  ITag,
} from '@app/models';

const initialState: IProductStoreState = {
  isLoading: false,
  error: null,
  product: null,
  products: [],
  productCategory: [],
  colors: [],
  tags: [],
  brands: [],
};

const productFeature = createFeature({
  name: 'Products',
  reducer: createReducer(
    initialState,
    // PRODUCTS
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

    on(productActions.createProduct, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.createProductSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        products: [...(state.products as IProduct[]), payload.response],
      };
    }),
    on(productActions.createProductFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.updateProduct, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.updateProductSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        products: state.products.map((prod) =>
          prod.id === payload.response.id
            ? Object.assign({}, prod, payload.response)
            : prod
        ),
        product:
          state.product?.id === payload.response.id
            ? Object.assign({}, state.product, payload.response)
            : state.product,
      };
    }),
    on(productActions.updateProductFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.deleteProduct, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.deleteProductSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        products: state.products.filter((x) => x.id !== payload.response.id),
      };
    }),
    on(productActions.deleteProductFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

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

    // PRODUCT CATEGORIES
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

    on(productActions.createProductCategory, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.createProductCategorySuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        productCategory: [
          ...(state.productCategory as IProductCategory[]),
          payload.response,
        ],
      };
    }),
    on(productActions.createProductCategoryFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.deleteProductCategory, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.deleteProductCategorySuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        productCategory: state.productCategory?.filter(
          (x) => x.id !== payload.response.id
        ),
      };
    }),
    on(productActions.deleteProductCategoryFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // Tags
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

    on(productActions.createTag, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.createTagSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        tags: [...(state.tags as ITag[]), payload.response],
      };
    }),
    on(productActions.createTagFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.deleteTag, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.deleteTagSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        tags: state.tags?.filter((x) => x.id !== payload.response.id),
      };
    }),
    on(productActions.deleteTagFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // PRODUCT BRANDS
    on(productActions.getBrands, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.getBrandsSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        brands: payload.response,
      };
    }),
    on(productActions.getBrandsFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.createBrand, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.createBrandSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        brands: [...(state.brands as IProductBrand[]), payload.response],
      };
    }),
    on(productActions.createBrandFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.deleteBrand, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.deleteBrandSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        brands: state.brands?.filter((x) => x.id !== payload.response.id),
      };
    }),
    on(productActions.deleteBrandFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // COLORS
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

    on(productActions.createColor, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.createColorSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        colors: [...(state.colors as IColor[]), payload.response],
      };
    }),
    on(productActions.createColorFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    on(productActions.deleteColor, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(productActions.deleteColorSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        colors: state.colors?.filter((x) => x.id !== payload.response.id),
      };
    }),
    on(productActions.deleteColorFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    })

    //
  ),
});

export const {
  name: productFeatureName,
  reducer: productReducer,
  selectError,
  selectIsLoading,
  selectProduct,
  selectProducts,
  selectProductCategory,
  selectColors,
  selectTags,
  selectBrands,
} = productFeature;
