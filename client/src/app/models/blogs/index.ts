export interface IBlogCategory {
  id: string;
  name: string;
}
// Trimmed down version of user to fit the requirements
interface Author {
  firstname: string;
  lastname: string;
  id: string;
  image?: string;
}

export interface IBlog {
  id: string;
  title: string;
  desc: string;
  views: number;
  categoryId: string;
  Category: IBlogCategory;
  Author: Author;
  updatedAt: string;
  image?: string;
}

export interface ICreateBlog {
  title: string;
  desc: string;
  categoryId: string;
  image: string;
}

// for optional query route paramenters,
// for some reason ngrx refused optional interfaces hence type here.
export type BlogQueryType = {
  cat?: string;
  page?: number;
  limit?: number;
};
