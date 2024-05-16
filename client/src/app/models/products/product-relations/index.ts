// All the relations: one-many,many-many with the product.

// Even though the interfaces are similar. The naming of each is necessay to portray the intent
// of the request/response.

export interface IProductCategory {
  id: string;
  name: string;
}

export interface ICreateProductCategory {
  name: string;
  userId: string;
}

export interface IProductBrand {
  id: string;
  name: string;
}

export interface ICreateProductBrand {
  name: string;
  userId: string;
}

export interface IColor {
  id: string;
  name: string;
}

export interface ITag {
  id: string;
  name: string;
}

// These private inteface is a trimmed down of the user model
// These is how the backend returns the user of the review
interface User {
  id: string;
  firstname: string;
  lastname: string;
  image: string;
}

export interface IReview {
  id: string;
  comment: string;
  productId: string;
  star: number;
  User: User;
  updatedAt?: string;
}

export interface ICreateReview {
  star: number;
  comment: string;
  productId: string;
}
