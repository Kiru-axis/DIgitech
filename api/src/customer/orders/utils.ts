export const prismaOrderUserResponse = {
  id: true,
  email: true,
  mobile: true,
  Address: {
    select: {
      address1: true,
      address2: true,
      city: true,
      firstname: true,
      lastname: true,
      state: true,
      other: true,
      zipCode: true,
      id: true,
    },
  },
  Cart: {
    select: {
      id: true,
      color: true,
      price: true,
      quantity: true,
      productId: true,
      orderId: true,
      userId: true,
    },
  },
};

export const customerPrismaOrderResponse = {
  id: true,
  paidAt: true,
  totalPrice: true,
  totalPriceAfterDiscount: true,
  createdAt: true,
  userId: true,
  status: true,
  OrderItems: {
    select: {
      id: true,
      color: true,
      price: true,
      quantity: true,
      title: true,
      productId: true,
    },
  },
};
