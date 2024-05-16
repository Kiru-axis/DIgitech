import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of, distinctUntilChanged } from 'rxjs';

import { blogActions } from './blogs.actions';
import { BlogService } from '@app/core/services/blog.service';
import { ToastrService } from 'ngx-toastr';

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

export const createProductEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    blogService = inject(BlogService)
  ) => {
    return actions$.pipe(
      ofType(blogActions.createBlog),
      mergeMap(({ request }) =>
        blogService.createBlog(request).pipe(
          map((response) => {
            toastr.success(`Blog Created`);
            return blogActions.createBlogSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(blogActions.createBlogFailure({ error }));
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

export const deleteBlogEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    blogService = inject(BlogService)
  ) => {
    return actions$.pipe(
      ofType(blogActions.deleteBlog),
      mergeMap(({ request }) =>
        blogService.deleteBlog(request.blogId).pipe(
          map((response) => {
            toastr.success(`Blog deleted`);
            return blogActions.deleteBlogSuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(blogActions.deleteBlogFailure({ error }));
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

export const deleteBlogCategoyEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    blogService = inject(BlogService)
  ) => {
    return actions$.pipe(
      ofType(blogActions.deleteBlogCategory),
      mergeMap(({ request }) =>
        blogService.deleteBlogCategory(request.categoryId).pipe(
          map((response) => {
            toastr.success(`Blog category deleted`);
            return blogActions.deleteBlogCategorySuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(blogActions.deleteBlogCategoryFailure({ error }));
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

export const createBlogCategoryEffects = createEffect(
  (
    actions$ = inject(Actions),
    toastr = inject(ToastrService),
    blogService = inject(BlogService)
  ) => {
    return actions$.pipe(
      ofType(blogActions.createBlogCategory),
      mergeMap(({ request }) =>
        blogService.createBlogCategory(request).pipe(
          map((response) => {
            toastr.success(`Blog category added to database`);
            return blogActions.createBlogCategorySuccess({ response });
          }),
          catchError((error) => {
            toastr.error(error.error.message, error.statusText);
            return of(blogActions.createBlogCategoryFailure({ error }));
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
