import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

import { WishlistsService } from './wishlists.service';
import {
  CreateWishlistDto,
  DeleteProductWishlistDto,
} from './dto/create-wishlist.dto';
import { CurrentUser } from 'src/common';
import { Roles } from 'src/common/decorators/role';

@ApiBearerAuth()
@ApiTags('customer/wishlists')
@Controller('customer/wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.wishlistsService.findAll(user.id);
  }

  @Roles(Role.ADMIN)
  @Get('all')
  async findAllAdmin() {
    return this.wishlistsService.findAllAdmin();
  }

  @Post()
  async create(@Body() dto: CreateWishlistDto, @CurrentUser() user: User) {
    return this.wishlistsService.create(user.id, dto);
  }

  @Delete()
  async remove(
    @CurrentUser() user: User,
    @Body() dto: DeleteProductWishlistDto,
  ) {
    await this.wishlistsService._getProductById(dto.productId);
    const wishlist = await this.wishlistsService._findWishByProdUserId(
      user.id,
      dto.productId,
    );
    if (user.id === wishlist.userId) {
      return this.wishlistsService.remove(wishlist.id);
    }

    throw new ForbiddenException('You cannot peform these operation');
  }

  @Delete('clear')
  async clear(@CurrentUser() user: User) {
    return this.wishlistsService.clear(user.id);
  }
}
