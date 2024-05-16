export interface ICreateCoupon {
  code: string;
  expiresAt: Date;
  discount: number;
}

export interface ICoupon {
  id: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  discount: number;
  used: boolean;
}

export interface IEnquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  comment: string;
  updatedAt: string;
}
