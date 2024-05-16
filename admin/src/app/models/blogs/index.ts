export interface IBlogCategory {
  id: string;
  name: string;
}

export interface ICreateBlogCategory {
  name: string;
}

export interface ICreateBlog {
  title: string;
  desc: string;
  categoryId: string;
  image?: any;
}

export interface IBlog {
  id: string;
  title: string;
  desc: string;
  views: number;
  categoryId: string;
  Category: IBlogCategory;
  Author: { firstname: string; lastname: string; id: string; image?: string };
  updatedAt: string;
  image?: string;
}

// for optional query route paramenters,
// for some reason ngrx refused optional interfaces hence type here.
export type BlogQueryType = {
  cat: string;
};
