import { BadRequestException } from '@nestjs/common';

export function validateRatingStarDto(star: number): number {
  if (star < 0 || star > 5) {
    throw new BadRequestException('Star rataing should be between 1 and 5');
  }
  return star;
}

export const prismaReviewResponse = {
  id: true,
  comment: true,
  star: true,
  productId: true,
  User: {
    select: {
      firstname: true,
      lastname: true,
      id: true,
      image: true,
    },
  },
};
