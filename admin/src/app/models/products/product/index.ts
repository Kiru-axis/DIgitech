import { IReview } from '../reviews';

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
  available: boolean;
  images: string[];
  Brand: INamedProductAttr;
  Category: INamedProductAttr;
  Colors: INamedProductAttr[];
  Tags: INamedProductAttr[];
  Reviews?: IReview[];
}

export interface ICreateProduct {
  title: string;
  desc: string;
  price: number;
  quantity: number;
  categoryId: string;
  brandId: string;
  colors: { name: string }[];
  tags: { name: string }[];
  // images?: any;
}

export type availableType = 'true' | 'false';

export type ProductQueryType = {
  cat?: string;
  color?: string;
  brand?: string;
  tag?: string;
  min?: number;
  max?: number;
  available?: availableType;
};
