import { createFeature, createReducer, on } from '@ngrx/store';
import { IBlogStoreState } from './blogs.models';
import { blogActions } from './blogs.actions';
import { IBlog, IBlogCategory } from '@app/models';

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

    // create blog
    on(blogActions.createBlog, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(blogActions.createBlogSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        blogs: [...(state.blogs as IBlog[]), payload.response],
      };
    }),
    on(blogActions.createBlogFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }),

    // delete blog
    on(blogActions.deleteBlog, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(blogActions.deleteBlogSuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,

        blogs: state.blogs.filter((x) => x.id !== payload.response.id),
      };
    }),
    on(blogActions.deleteBlogFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,

        error: payload.error,
      };
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
    }),
    // DELETE BLOG CATEGORIES
    on(blogActions.deleteBlogCategory, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(blogActions.deleteBlogCategorySuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,

        blogCategories: state.blogCategories?.filter(
          (x) => x.id !== payload.response.id
        ),
      };
    }),
    on(blogActions.deleteBlogCategoryFailure, (state, payload) => {
      return {
        ...state,
        isLoading: false,

        error: payload.error,
      };
    }),

    // create blog category

    on(blogActions.createBlogCategory, (state) => {
      return { ...state, error: null, isLoading: true };
    }),
    on(blogActions.createBlogCategorySuccess, (state, payload) => {
      return {
        ...state,
        isLoading: false,
        blogCategories: [
          ...(state.blogCategories as IBlogCategory[]),
          payload.response,
        ],
      };
    }),
    on(blogActions.createBlogCategoryFailure, (state, payload) => {
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
