import { IBlog, IBlogCategory } from '@app/models';

export interface IBlogStoreState {
  isLoading: boolean;
  error: any;
  blogs: IBlog[];
  blog: IBlog | null | undefined;
  blogCategories: IBlogCategory[];
}
