import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { CartsService } from './carts.service';
import {
  CreateCartDto,
  DeleteCartProductDto,
  UpdateCartDto,
} from './dto/index.dto';
import { CurrentUser } from 'src/common';

@ApiTags('customer/carts')
@ApiBearerAuth()
@Controller('customer/carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUserCart(@CurrentUser() user: User) {
    return this.cartService.getUserCart(user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async addToCart(@Body() dto: CreateCartDto, @CurrentUser() user: User) {
    return this.cartService.addToCart(dto, user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateCart(@Body() dto: UpdateCartDto, @CurrentUser() user: User) {
    return this.cartService.updateCart(dto, user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  async deleteFromCart(
    @Body() dto: DeleteCartProductDto,
    @CurrentUser() user: User,
  ) {
    return this.cartService.deleteFromCart(dto, user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('clear')
  async clearCart(@CurrentUser() user: User) {
    return this.cartService.clearCart(user.id);
  }
}
//  {
//   constructor(private readonly cartsService: CartsService) {}

//   @Get()
//   async getUserCarts(@CurrentUser() user: User) {
//     return this.cartsService.getUserCarts(user.id);
//   }

//   @Roles(Role.ADMIN)
//   @Get('all')
//   async adminGetAllCarts() {
//     return this.cartsService.adminGetAllCarts();
//   }

//   @Post('add')
//   createCart(@Body() dto: CreateCartDto, @CurrentUser() user: User) {
//     return this.cartsService.createCart(user.id, dto);
//   }

//   @Put()
//   async updateCart(@Body() dto: UpdateCartDto, @CurrentUser() user: User) {
//     return this.cartsService.updateCart(user.id, dto);
//   }

//   @Delete('delete')
//   async deleteProductFromCart(
//     @Body() dto: DeleteCartProductDto,
//     @CurrentUser() user: User,
//   ) {
//     return this.cartsService.deleteProductFromCart(user.id, dto);
//   }

//   @Delete('clear')
//   async clearCart(@CurrentUser() user: User) {
//     return this.cartsService.clearCart(user.id);
//   }
// }
