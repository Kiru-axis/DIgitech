// THESE FOLDER AND FILES N HERE DIFFERS WITH CUSTOMER MODELS BY:
// THE MODELS HERE PERTAIN TO THE USER PROFILE ONLY:->
// ADDRESS
// UPDATE USER
//

interface IAddress {
  id: string;
  firstname: string;
  lastname: string;
  zipCode: number;
  state: string;
  city: string;
  address1: string;
  address2?: string;
  other?: string;
}

// The updateAddress is a partial type of these interface
export interface ICreateAddress {
  firstname: string;
  lastname: string;
  zipCode: number;
  address1: string;
  city: string;
  state: string;
  other: string | null;
  address2: string | null;
}

// The user Address is optional because its only required to make an order.
export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  image?: string;
  Address?: IAddress;
  token?: string;
}

// These are the only fields the backend allows to update a user.
export interface IUpdateUser {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  image: string;
}
