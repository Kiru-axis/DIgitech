import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompareDto } from './dto/create-compare.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const prismaCompareResponse = {
  id: true,
  userId: true,
  productId: true,
  Product: {
    select: {
      id: true,
      title: true,
      price: true,
      Colors: true,
      Brand: { select: { name: true } },
      Category: { select: { name: true } },
      images: true,
    },
  },
};

@Injectable()
export class ComparesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.compare.findMany({
      where: { userId },
      select: {
        ...prismaCompareResponse,
      },
    });
  }

  async findAllAdmin() {
    return this.prisma.compare.findMany({
      select: {
        ...prismaCompareResponse,
      },
    });
  }

  async create(userId: string, dto: CreateCompareDto) {
    await this._getProductById(dto.productId);
    await this._checkIfProductInCompare(dto.productId, userId);

    return this.prisma.compare.create({
      data: { productId: dto.productId, userId },
    });
  }

  async clear(userId: string) {
    return this.prisma.compare.deleteMany({ where: { userId } });
  }

  async remove(wishlistId: string) {
    return this.prisma.compare.delete({ where: { id: wishlistId } });
  }

  // helpers

  async _getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  private async _checkIfProductInCompare(productId: string, userId: string) {
    const checkCompares = await this.prisma.compare.findFirst({
      where: { userId, productId },
    });

    if (!checkCompares) return;

    throw new BadRequestException('Product already in compares');
  }

  async _findWishByProdUserId(userId: string, productId: string) {
    const compare = await this.prisma.compare.findFirst({
      where: { AND: { productId, userId } },
    });
    if (!compare) throw new BadRequestException('Compare list not found');
    return compare;
  }
}
