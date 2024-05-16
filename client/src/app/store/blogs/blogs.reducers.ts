import { createFeature, createReducer, on } from '@ngrx/store';
import { IBlogStoreState } from './blogs.models';
import { blogActions } from './blogs.actions';

const initialState: IBlogStoreState = {
  isLoading: false,
  error: null,
  blog: null,
  blogs: [],
  blogCategories: [],
};

const blogFeature = createFeature({
  name: 'Blogs',
  reducer: createReducer(
    initialState,
    // GET ALL Blogs
    on(blogActions.getAllBlogs, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(blogActions.getAllBlogsSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        blogs: payload.response,
      };
    }),
    on(blogActions.getAllBlogsFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // GET SINGLE Blog
    on(blogActions.getSingleBlog, (state) => {
      return { ...state, isLoading: true, error: null };
    }),
    on(blogActions.getSingleBlogSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        blog: payload.response,
      };
    }),
    on(blogActions.getSingleBlogFailure, (state, payload) => {
      return { ...state, isLoading: false, error: payload.error };
    }),

    // GET Blog Categories
    on(blogActions.getAllBlogCategories, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(blogActions.getAllBlogCategoriesSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        blogCategories: payload.response,
      };
    }),
    on(blogActions.getAllBlogCategoriesFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    })
  ),
});

export const {
  name: blogFeatureName,
  reducer: blogReducer,
  selectError,
  selectIsLoading,
  selectBlog,
  selectBlogs,
  selectBlogCategories,
} = blogFeature;
