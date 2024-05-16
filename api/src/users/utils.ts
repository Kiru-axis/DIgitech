import { BadRequestException } from '@nestjs/common';

export function checkZipCodeLength(len: number) {
  if (len) {
    const check = len.toLocaleString().length;

    if (check < 4)
      throw new BadRequestException('Zip Code requires minimum of 4 numbers');

    return len;
  }
}

export const prismaUserResponse = {
  id: true,
  firstname: true,
  lastname: true,
  blocked: true,
  email: true,
  mobile: true,
  role: true,
  image: true,
  Address: {
    select: {
      address1: true,
      address2: true,
      city: true,
      firstname: true,
      lastname: true,
      other: true,
      state: true,
      zipCode: true,
    },
  },
};

export const prismaAdminUserResponse = {
  updatedAt: true,
  createdAt: true,
  Cart: true,
  Orders: true,
  Compare: {
    select: {
      id: true,
      productId: true,
      Product: {
        select: {
          title: true,
          price: true,
        },
      },
    },
  },
  Wishlist: {
    select: {
      id: true,
      productId: true,
      Product: {
        select: {
          title: true,
          price: true,
        },
      },
    },
  },
  ...prismaUserResponse,
};
