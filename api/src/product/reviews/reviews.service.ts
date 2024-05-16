import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto, GetReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { prismaReviewResponse, validateRatingStarDto } from './utils';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(dto: GetReviewDto) {
    await this._findProductyId(dto.productId);
    return this.prisma.review.findMany({ where: { productId: dto.productId } });
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new BadRequestException('Review not found');
    return review;
  }

  async create(dto: CreateReviewDto, userId: string) {
    // check if the product exists on the database in the firstplace
    await this._findProductyId(dto.productId);
    // check if the product exists in users previous orders
    const inOrderItems = await this.prisma.orderItem.findFirst({
      where: {
        productId: dto.productId,
        Order: {
          userId,
        },
      },
    });

    // if not found raise exception
    if (!inOrderItems) {
      throw new BadRequestException(
        'Please purchase the product to make a review',
      );
    }

    // check if a review has been created befor
    const reviewCreatedBefore = await this.prisma.review.findFirst({
      where: {
        AND: {
          userId,
          productId: dto.productId,
        },
      },
    });

    if (reviewCreatedBefore) {
      throw new ForbiddenException(
        'You have already created a review for these product',
      );
    }

    // update the product star count
    await this.prisma.product.update({
      where: { id: dto.productId },
      data: {
        totalRating: { increment: dto.star },
        reviewersCount: { increment: 1 },
      },
    });

    // create new review
    const review = await this.prisma.review.create({
      data: {
        comment: dto.comment,
        star: validateRatingStarDto(dto.star),
        userId,
        productId: dto.productId,
      },
      select: { ...prismaReviewResponse },
    });

    return review;
  }

  async remove(id: string) {
    const del = await this.prisma.review.delete({
      where: { id },
      select: { ...prismaReviewResponse },
    });

    // update the product star count
    await this.prisma.product.update({
      where: { id: del.productId },
      data: {
        totalRating: { decrement: del.star },
        reviewersCount: { decrement: 1 },
      },
    });
    return del;
  }

  // Helpers

  async _findProductyId(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  //
  private async _productInOrders(productId: string) {
    const inOrder = await this.prisma.orderItem.findFirst({
      where: { productId },
    });
    if (!inOrder)
      throw new BadRequestException(
        'Please purchase the item to make a review',
      );
    return inOrder;
  }
}
