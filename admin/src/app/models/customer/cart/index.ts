export interface ICart {
  id: string;
  color: string;
  price: number;
  quantity: number;
  productId: string;
  userId: string;
  Product: {
    title: string;
    images: string[];
  };
}

export interface ICreateCart {
  productId: string;
  quantity: number;
  color?: string;
}

export interface ICartData {
  quantity: number;
  totalPrice: number;
  cart: ICart[] | null | undefined;
}

export interface IDeleteCatProductRequest {
  cartId: string;
  productId: string;
}

export interface IUpdateCartRequest {
  cartId: string;
  quantity: number;
}
