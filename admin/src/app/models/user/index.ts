import { ICart, IOrderResponse } from '../customer';

export interface IAddress {
  id: string;
  firstname: string;
  lastname: string;
  zipCode: number;
  state: string;
  city: string;
  address1: string;
  address2: string;
  other: string;
}

export interface ICreateAddress {
  firstname: string;
  lastname: string;
  zipCode: number;
  address1: string;
  city: string;
  state: string;
  other?: string;
  address2?: string;
}

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  image: string | null;
  Address: IAddress;
  blocked: boolean;
  updatedAt: string;
  createdAt: string;
  role: string;
  token?: string;
  Cart: ICart[];
  Orders: IOrderResponse[];
  Compare: {
    id: string;
    productId: string;
    Product: {
      title: string;
      price: string;
    };
  }[];
  Wishlist: {
    id: string;
    productId: string;
    Product: {
      title: string;
      price: string;
    };
  }[];
}

export interface IUpdateUser {
  firstname?: string;
  lastname?: string;
  mobile?: string;
  Address?: IAddress;
}

export type UsersQueryType = {
  fname?: string;
  lname?: string;
  email?: string;
  mobile?: string;
  page?: number;
  limit?: number;
};

// class CustomAddressUpdateDto {
//   firstname?: string;
//   lastname?: string;
//   zipCode?: number;
//   address1?: string;
//   city?: string;
//   state?: string;
//   address2?: string;
//   other?: string;
// }
