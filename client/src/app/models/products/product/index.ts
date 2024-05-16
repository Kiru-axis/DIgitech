// Colors/Tags/Categories/Brands have these shape

import { IReview } from '../product-relations';

// Make it a private interface for common values.
interface INamedProductAttr {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  title: string;
  desc: string;
  price: number;
  quantity: number;
  sold: number;
  totalRating: number;
  reviewersCount: number;
  available: boolean;
  images: string[];
  createdAt: string;
  Brand: INamedProductAttr;
  Category: INamedProductAttr;
  Colors: INamedProductAttr[];
  Tags: INamedProductAttr[];
  Reviews?: IReview[];
}

// FOR QUERIES TO THE BACKEND

// product availability is a boolean
// stringify the boolean for the backend to understand the filter.
export type QueryAvailableType = 'true' | 'false';

// For query params on the router,interfaces are not allowed hence the type.
export type ProductQueryType = {
  cat?: string;
  color?: string;
  brand?: string;
  tag?: string;
  min?: string;
  max?: string;
  page?: string;
  limit?: string;
  available?: QueryAvailableType;
  bestSelling?: string;
  latest?: string;
};
