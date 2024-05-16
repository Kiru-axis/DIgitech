import {
  BlogQueryType,
  IBlog,
  IBlogCategory,
  ICreateBlog,
  ICreateCommonProductSup,
} from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const blogActions = createActionGroup({
  source: '[Blogs]',
  events: {
    // GET ALL Blogs
    'Get All Blogs': props<{ request?: BlogQueryType }>(),
    'Get All Blogs Success': props<{ response: IBlog[] }>(),
    'Get All Blogs Failure': props<{ error: any }>(),

    // GET SINGLE BLOG
    'Get Single Blog': props<{ blogId: string }>(),
    'Get Single Blog Success': props<{ response: IBlog }>(),
    'Get Single Blog Failure': props<{ error: any }>(),

    // CREATE BLOG
    'Create Blog': props<{ request: ICreateBlog }>(),
    'Create Blog Success': props<{ response: IBlog }>(),
    'Create Blog Failure': props<{ error: any }>(),

    // DELETE BLOG
    'Delete Blog': props<{ request: { blogId: string } }>(),
    'Delete Blog Success': props<{ response: IBlog }>(),
    'Delete Blog Failure': props<{ error: any }>(),

    // BLOG CATEGORIES
    'Get All Blog Categories': emptyProps(),
    'Get All Blog Categories Success': props<{ response: IBlogCategory[] }>(),
    'Get All Blog Categories Failure': props<{ error: any }>(),

    // DELETE BLOG CATEGORY
    'Delete Blog Category': props<{ request: { categoryId: string } }>(),
    'Delete Blog Category Success': props<{ response: IBlogCategory }>(),
    'Delete Blog Category Failure': props<{ error: any }>(),

    // CREATE BLOG CATEGORY
    'Create Blog Category': props<{ request: ICreateCommonProductSup }>(),
    'Create Blog Category Success': props<{ response: IBlogCategory }>(),
    'Create Blog Category Failure': props<{ error: any }>(),
  },
});
