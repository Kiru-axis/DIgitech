import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of, distinctUntilChanged } from 'rxjs';

import { ProductService } from '@core/services/product.service';
import { productActions } from './products.actions';

export const getAllProductsEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getAllProducts),
      mergeMap(({ request }) =>
        productService.getAllProducts({ ...request }).pipe(
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

// COlors
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

// Revews
export const createReviewEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.createReview),
      mergeMap(({ request }) =>
        productService.createReview(request).pipe(
          map((response) => productActions.createReviewSuccess({ response })),
          catchError((error) =>
            of(productActions.createReviewFailure({ error }))
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

export const deleteReviewEffects = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.deleteReview),
      mergeMap(({ reviewId }) =>
        productService.deleteReview(reviewId).pipe(
          map((response) => productActions.deleteReviewSuccess({ response })),
          catchError((error) =>
            of(productActions.deleteReviewFailure({ error }))
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
