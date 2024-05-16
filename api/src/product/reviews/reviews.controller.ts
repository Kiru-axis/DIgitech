import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto, GetReviewDto } from './dto/create-review.dto';
import { CurrentUser } from 'src/common';

@ApiTags('product-reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async findAll(@Body() dto: GetReviewDto) {
    return this.reviewsService.findAll(dto);
  }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewsService.create(createReviewDto, user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    const review = await this.reviewsService.findOne(id);

    if (user.id !== review.userId) {
      throw new ForbiddenException();
    }
    return this.reviewsService.remove(id);
  }
}
