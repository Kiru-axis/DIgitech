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
