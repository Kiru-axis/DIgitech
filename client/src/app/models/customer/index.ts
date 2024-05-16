// THESE FOLDER AND FILES N HERE DIFFERS WITH CUSTOMER MODELS BY:
// THE MODELS HERE PERTAIN TO THE CSUTOMER ONLY:->
// CART, UPDATE & DELETE CART
// WISHLIST,COMPARELIST -> UPDATES OF BOTH
//ORDERS

// ######## CART #########
export interface ICart {
  id: string;
  color: string;
  price: number;
  quantity: number;
  productId: string;
  userId: string;
  // trimmed down version of product to accomodate required field.
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

// Transform the cart to fit these interface to get its internals
export interface ICartData {
  quantity: number;
  totalPrice: number;
  cart: ICart[] | null | undefined;
}

export interface IDeleteCartProduct {
  cartId: string;
  productId: string;
}

export interface IUpdateCart {
  cartId: string;
  quantity: number;
}

// ######## COMPARES #########
export interface ICompare {
  id: string;
  userId: string;
  productId: string;
  Product: {
    id: string;
    title: string;
    price: number;
    Brand: {
      name: string;
      id: string;
    };
    Category: {
      name: string;
      id: string;
    };
    Colors: {
      name: string;
      id: string;
    }[];
    images: string[];
  };
}

export interface ICreateCompare {
  productId: string;
}

// ######## WSHLIST #########

export interface IWishlist {
  id: string;
  Product: {
    id: string;
    title: string;
    price: number;
    images: string[];
  };
  productId: string;
  userId: string;
}

export interface ICreateWishlist {
  productId: string;
}

// ######## ORDERS #########

// The order takes the items from the cart which behaves like a session.
export interface IOrder {
  id: string;
  paidAt: string;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  addressId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  OrderItems: Array<IOrderItems>;
  status: string;
}

// The items in the for the order after the order is placed and the cart cleared.
export interface IOrderItems {
  id: string;
  color: string;
  price: number;
  productId: string;
  quantity: number;
  title: string;
}

// The code in these interface is the optional coupon code which customer may have or not.
// So in create order these interface appears as optional
export interface ICreateOrder {
  code: string;
}
