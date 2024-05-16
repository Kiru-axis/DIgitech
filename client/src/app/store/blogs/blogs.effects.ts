import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of, distinctUntilChanged } from 'rxjs';

import { BlogService } from '@core/services/blog.service';
import { blogActions } from './blogs.actions';

export const getAllBlogsEffects = createEffect(
  (actions$ = inject(Actions), blogService = inject(BlogService)) => {
    return actions$.pipe(
      ofType(blogActions.getAllBlogs),
      mergeMap(({ request }) => {
        return blogService.getAllBlogs(request).pipe(
          map((response) => blogActions.getAllBlogsSuccess({ response })),
          catchError((error) => of(blogActions.getAllBlogsFailure({ error }))),
          distinctUntilChanged()
        );
      })
    );
  },
  {
    functional: true,
  }
);

export const getSingleBlogEffects = createEffect(
  (actions$ = inject(Actions), blogService = inject(BlogService)) => {
    return actions$.pipe(
      ofType(blogActions.getSingleBlog),
      mergeMap(({ blogId }) =>
        blogService
          .getSingleBlog(blogId)
          .pipe(
            map((response) => blogActions.getSingleBlogSuccess({ response }))
          )
      ),
      catchError((error) => of(blogActions.getSingleBlogFailure({ error }))),
      distinctUntilChanged()
    );
  },
  {
    functional: true,
  }
);

// BLOG CATEGORIES
export const getAllBlogCategoriesEffects = createEffect(
  (actions$ = inject(Actions), blogService = inject(BlogService)) => {
    return actions$.pipe(
      ofType(blogActions.getAllBlogCategories),
      mergeMap(() =>
        blogService.getAllBlogCategories().pipe(
          map((response) =>
            blogActions.getAllBlogCategoriesSuccess({ response })
          ),
          catchError((error) =>
            of(blogActions.getAllBlogCategoriesFailure({ error }))
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
