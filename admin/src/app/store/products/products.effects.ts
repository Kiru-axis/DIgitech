import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of, distinctUntilChanged } from 'rxjs';

import { productActions } from './products.actions';
import { ProductService } from '@app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';

// PRODUCT

export const getAllProductsEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getAllProducts),
      mergeMap(({ request }) =>
        productService.getAllProducts().pipe(
          map((response) => productActions.getAllProductsSuccess({ response })),
          catchError((error) =>
            of(productActions.getAllProductsFailure({ error }))
          ),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const createProductEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.createProduct),
      mergeMap(({ request }) =>
        productService.createProduct(request).pipe(
          map((response) => {
            toastr.success(`Product added to database`);
            return productActions.createProductSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.createProductFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const updateProductEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.updateProduct),
      mergeMap(({ request }) =>
        productService.updateProduct(request.dto, request.productId).pipe(
          map((response) => {
            toastr.success(`Product updated`);
            return productActions.updateProductSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.updateProductFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const deleteProductEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.deleteProduct),
      mergeMap(({ request }) =>
        productService.deleteProduct(request.productId).pipe(
          map((response) => {
            toastr.success(`Product deleted`);
            return productActions.deleteProductSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.deleteProductFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

export const getSingleProductEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getSingleProduct),
      mergeMap(({ productId }) =>
        productService
          .getSingleProduct(productId)
          .pipe(
            map((response) =>
              productActions.getSingleProductSuccess({ response })
            )
          )
      ),
      catchError((error) =>
        of(productActions.getSingleProductFailure({ error }))
      ),
      distinctUntilChanged()
    );
  },
  {
    functional: true,
  }
);

// PRODUCT CATEGORIES
export const getProductCategoriesEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getProductCategories),
      mergeMap(() =>
        productService.getAllProductCategories().pipe(
          map((response) =>
            productActions.getProductCategoriesSuccess({ response })
          ),
          catchError((error) =>
            of(productActions.getProductCategoriesFailure({ error }))
          ),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const createProductCategoriesEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.createProductCategory),
      mergeMap(({ request }) =>
        productService.createProductCategory(request).pipe(
          map((response) => {
            toastr.success(`Product category added to database`);
            return productActions.createProductCategorySuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.createProductCategoryFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const deleteProductCategoyEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.deleteProductCategory),
      mergeMap(({ request }) =>
        productService.deleteProductCategory(request.categoryId).pipe(
          map((response) => {
            toastr.success(`Product category deleted`);
            return productActions.deleteProductCategorySuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.deleteProductCategoryFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

// COlORS
export const getColorsEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getColors),
      mergeMap(() =>
        productService.getColors().pipe(
          map((response) => productActions.getColorsSuccess({ response })),
          catchError((error) => of(productActions.getColorsFailure({ error }))),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const createColorEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.createColor),
      mergeMap(({ request }) =>
        productService.createColor(request).pipe(
          map((response) => {
            toastr.success(`Color added to database`);
            return productActions.createColorSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.createColorFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const deleteColorEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.deleteColor),
      mergeMap(({ request }) =>
        productService.deleteColor(request.colorId).pipe(
          map((response) => {
            toastr.success(`Color deleted`);
            return productActions.deleteColorSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.deleteColorFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

// Tags
export const getTagsEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getTags),
      mergeMap(() =>
        productService.getAllTags().pipe(
          map((response) => productActions.getTagsSuccess({ response })),
          catchError((error) => of(productActions.getTagsFailure({ error }))),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const createTagEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.createTag),
      mergeMap(({ request }) =>
        productService.createTag(request).pipe(
          map((response) => {
            toastr.success(`Tag added to database`);
            return productActions.createTagSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.createTagFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const deleteTagEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.deleteTag),
      mergeMap(({ request }) =>
        productService.deleteTag(request.tagId).pipe(
          map((response) => {
            toastr.success(`Tag deleted`);
            return productActions.deleteTagSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.deleteTagFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);

// Brands
export const getBrandsEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getBrands),
      mergeMap(() =>
        productService.getAllBrands().pipe(
          map((response) => productActions.getBrandsSuccess({ response })),
          catchError((error) => of(productActions.getBrandsFailure({ error }))),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const createBrandEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.createBrand),
      mergeMap(({ request }) =>
        productService.createProductBrand(request).pipe(
          map((response) => {
            toastr.success(`Product brand added to database`);
            return productActions.createBrandSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.createBrandFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
export const deleteProductBrandEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    productService = inject(ProductService)
  ) => {
    return actions$.pipe(
      ofType(productActions.deleteBrand),
      mergeMap(({ request }) =>
        productService.deleteProductBrand(request.brandId).pipe(
          map((response) => {
            toastr.success(`Product brand deleted`);
            return productActions.deleteBrandSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(productActions.deleteBrandFailure({ error }));
          }),
          distinctUntilChanged()
        )
      )
    );
  },
  {
    functional: true,
  }
);
