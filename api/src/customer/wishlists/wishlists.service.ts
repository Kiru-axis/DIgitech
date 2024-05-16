import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const prismaWishlistResponse = {
  id: true,
  userId: true,
  productId: true,
  Product: {
    select: {
      id: true,
      title: true,
      price: true,
      images: true,
    },
  },
};

@Injectable()
export class WishlistsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.wishlist.findMany({
      where: { userId },
      select: {
        ...prismaWishlistResponse,
      },
    });
  }

  async findAllAdmin() {
    return this.prisma.wishlist.findMany({
      select: {
        userId: true,
        productId: true,
        Product: {
          select: { ...prismaWishlistResponse },
        },
      },
    });
  }

  async create(userId: string, dto: CreateWishlistDto) {
    await this._getProductById(dto.productId);
    await this._checkIfProductInWishlist(dto.productId, userId);

    return this.prisma.wishlist.create({
      data: { productId: dto.productId, userId },
    });
  }

  async clear(userId: string) {
    return this.prisma.wishlist.deleteMany({ where: { userId } });
  }

  async remove(wishlistId: string) {
    return this.prisma.wishlist.delete({ where: { id: wishlistId } });
  }

  // helpers

  async _getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  private async _checkIfProductInWishlist(productId: string, userId: string) {
    const checkWishlist = await this.prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (!checkWishlist) return;

    throw new BadRequestException('Product already in wishlist');
  }

  async _findWishByProdUserId(userId: string, productId: string) {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: { AND: { productId, userId } },
    });
    if (!wishlist) throw new BadRequestException('Wishlist not found');
    return wishlist;
  }
}
