import { BlogQueryType, IBlog, IBlogCategory } from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const blogActions = createActionGroup({
  source: '[Blogs]',
  events: {
    // GET ALL Blogs
    'Get All Blogs': props<{ request?: BlogQueryType }>(),
    'Get All Blogs Success': props<{ response: IBlog[] }>(),
    'Get All Blogs Failure': props<{ error: any }>(),

    // GET SINGLE Blog
    'Get Single Blog': props<{ blogId: string }>(),
    'Get Single Blog Success': props<{ response: IBlog }>(),
    'Get Single Blog Failure': props<{ error: any }>(),

    // BLOG CATEGORIES
    'Get All Blog Categories': emptyProps(),
    'Get All Blog Categories Success': props<{ response: IBlogCategory[] }>(),
    'Get All Blog Categories Failure': props<{ error: any }>(),
  },
});
