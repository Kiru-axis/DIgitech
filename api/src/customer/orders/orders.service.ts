import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart, OrderStatus, User } from '@prisma/client';
import * as dayjs from 'dayjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
const clientUrl = process.env.CLIENT_URL as string;

import { OrderCouponDto } from './dto/index.dto';
import { ICustomOrderItem } from 'src/common';
import { Request, Response } from 'express';
import { customerPrismaOrderResponse } from './utils';

export interface IOrderFilters {
  limit: number;
  page: number;
  price: {
    lte?: number;
    gte?: number;
  };
}

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      select: {
        ...customerPrismaOrderResponse,
      },
    });
  }

  async findAll(filters: IOrderFilters) {
    const limit = 15;

    return this.prisma.order.findMany({
      where: {
        totalPrice: filters.price,
      },
      take: filters.limit || limit,
      skip: ((filters.page || 1) - 1) * (filters.limit || limit),

      select: {
        id: true,
        paidAt: true,
        totalPrice: true,
        totalPriceAfterDiscount: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        OrderItems: {
          select: {
            id: true,
            title: true,
            quantity: true,
            color: true,
            price: true,
            orderId: true,
            productId: true,
          },
        },
      },
    });
  }

  async creatOrder(user: User, dto: OrderCouponDto) {
    const userData = await this._getUserWithAddress(user.id);

    const orderItems = await this.iterateCartData(userData.Cart);

    const coupon = await this.getCouponByCode(dto.coupon);

    const totalPrice = userData.Cart.map((d) => d.price).reduce(
      (a, b) => a + b,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        addressId: userData.Address.id,
        userId: user.id,
        totalPrice,
        totalPriceAfterDiscount: dto.coupon
          ? totalPrice - totalPrice * coupon.discount
          : totalPrice,
        OrderItems: { create: orderItems },
        status: OrderStatus.Ordered,
      },
      include: { OrderItems: true },
    });

    if (dto.coupon) {
      await this.prisma.coupon.update({
        where: { id: coupon.id },
        data: { used: true },
      });
    }

    try {
      const lineItems = orderItems.map((cart) => {
        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
          price_data: {
            currency: 'usd',
            unit_amount: cart.price,
            product_data: {
              name: cart.title,
              metadata: {
                color: cart.color,
              },
            },
          },
          quantity: Number(cart.quantity * 100),
        };
        return line_item;
      });

      const sessionData = await stripe.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
          {
            shipping_rate_data: {
              display_name: 'Delivery',
              type: 'fixed_amount',
              fixed_amount: {
                amount: Number(totalPrice),
                currency: 'usd',
              },
            },
          },
        ],
        mode: 'payment',
        metadata: {
          orderId: order.id,
        },
        success_url: `${clientUrl}/customer/checkout`,
        cancel_url: `${clientUrl}/customer/checkout`,
      });

      if (!sessionData.url) {
        // if the session creation fails, delete the order
        await this.prisma.order.delete({
          where: { id: order.id, userId: user.id },
        });
        throw new InternalServerErrorException('Error creating stripe session');
      }

      await this.clearCart(user.id);
      return { url: sessionData.url };
    } catch (error) {
      await this.prisma.order.delete({
        where: { id: order.id, userId: user.id },
      });
      throw new InternalServerErrorException(error.raw.message);
    }
  }

  //   helpers
  private async _getUserWithAddress(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Address: true, Cart: true },
    });
    if (!user.Address)
      throw new BadRequestException('Address is required to proceed');

    if (!user.Cart.length)
      throw new BadRequestException('Please add items to cart to proceed');

    return user;
  }

  private async getCouponByCode(code: string) {
    if (code) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code },
      });
      if (!coupon) throw new BadRequestException('Invalid coupon');
      if (dayjs().isAfter(coupon.expiresAt))
        throw new BadRequestException(
          'These coupon has already expired. Please contact system administrator for more details',
        );
      if (coupon.used) throw new BadRequestException('Invalid coupon');

      return coupon;
    }
  }

  private async clearCart(userId: string) {
    await this.prisma.cart.deleteMany({ where: { userId } });
  }

  private async iterateCartData(cartData: Cart[]) {
    const cartItems: ICustomOrderItem[] = [];

    for (let i = 0; i < cartData.length; i++) {
      const e = cartData[i];
      cartItems.push({
        color: e.color,
        price: e.price,
        productId: e.productId,
        quantity: e.quantity,
        title: e.title,
      });
    }

    return cartItems;
  }
}
