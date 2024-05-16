import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCartDto,
  DeleteCartProductDto,
  UpdateCartDto,
} from './dto/index.dto';

const prismaCartResponse = {
  id: true,
  color: true,
  price: true,
  quantity: true,
  productId: true,
  userId: true,
  title: true,
  Product: {
    select: {
      title: true,
      images: true,
      quantity: true,
    },
  },
};

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserCart(userId: string) {
    return this.prisma.cart.findMany({
      where: { userId },
      select: {
        ...prismaCartResponse,
      },
    });
  }

  async addToCart(dto: CreateCartDto, userId: string) {
    const product = await this._getProductById(dto.productId);

    // check if the user quantity exceeds product quantity
    if (dto.quantity > product.quantity)
      throw new BadRequestException(
        'Quantity exceeds availble product quantity',
      );

    // if already in cart then delete it
    await this._ifInCart(dto.productId, userId);

    // first sub quantity from product in question
    await this.prisma.product.update({
      where: { id: dto.productId },
      data: { quantity: { decrement: dto.quantity } },
    });

    // create cart

    const newCart = await this.prisma.cart.create({
      data: {
        price: product.price * dto.quantity,
        quantity: dto.quantity,
        productId: dto.productId,
        title: product.title,
        userId,
        color:
          dto.color && product.Colors.map((x) => x.name.includes(dto.color))
            ? dto.color.toLowerCase()
            : product.Colors[0].name,
      },
      select: {
        ...prismaCartResponse,
      },
    });

    return newCart;
  }

  async updateCart(dto: UpdateCartDto, userId: string) {
    const found = await this.prisma.cart.findFirst({
      where: { AND: { userId, id: dto.cartId } },
    });

    if (!found) {
      throw new BadRequestException('Please make sure to add to cart first');
    }

    const product = await this._getProductById(found.productId);

    const productQty = product.quantity + found.quantity;

    const update = await this.prisma.cart.update({
      where: { id: found.id },
      data: {
        quantity: dto.quantity,
        price: dto.quantity * product.price,
        Product: {
          update: {
            quantity:
              productQty - dto.quantity > 0.5 * product.quantity
                ? productQty - dto.quantity
                : dto.quantity - productQty,
          },
        },
      },
      select: { ...prismaCartResponse },
    });

    return update;
    // return { productQty, foundqty: found.quantity, update };

    return {
      found,
      product,
    };
  }

  async deleteFromCart(dto: DeleteCartProductDto, userId: string) {
    const inCart = await this.prisma.cart.findFirst({
      where: { AND: { productId: dto.productId, userId, id: dto.cartId } },
    });

    if (!inCart) {
      throw new BadRequestException('Please make sure to add to cart first');
    }

    return this.prisma.cart.delete({ where: { id: dto.cartId } });
  }

  async clearCart(userId: string) {
    return this.prisma.cart.deleteMany({ where: { userId } });
  }

  // HELPERS
  private async _getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { Colors: { select: { name: true } } },
    });
    if (!product)
      throw new BadRequestException('Please select a valid product');
    return product;
  }

  private async _ifInCart(productId: string, userId: string) {
    const inCart = await this.prisma.cart.findFirst({
      where: { AND: { productId, userId } },
    });
    if (inCart) {
      throw new BadRequestException('You already have these product in cart');
    }
  }
}
