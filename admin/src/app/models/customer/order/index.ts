interface IOrderItemResponse {
  id: string;
  quantity: number;
  price: number;
  color: string;
  productId: string;
  orderId: string;
}

export interface IOrderResponse {
  id: string;
  paidAt: string;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  addressId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  OrderItems: Array<IOrderItemResponse>;
}

export type OrderQueryType = {
  min?: string;
  limit?: string;
  page?: string;
  max?: string;
};
