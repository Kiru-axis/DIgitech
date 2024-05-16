import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

import { IOrderFilters, OrdersService } from './orders.service';
import { CurrentUser } from 'src/common';
import { OrderCouponDto } from './dto/index.dto';
import { Roles } from 'src/common/decorators/role';

@ApiBearerAuth()
@ApiTags('customer/orders')
@Controller('customer/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async creatOrder(@Body() dto: OrderCouponDto, @CurrentUser() user: User) {
    return this.ordersService.creatOrder(user, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('min') min: string,
    @Query('max') max: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const filters: IOrderFilters = {
      ...(page && { page: Number(page) }),
      ...(limit && { limit: Number(limit) }),
      ...((min || max) && {
        price: {
          ...(min && { gte: Number(min) }),
          ...(max && { lte: Number(max) }),
        },
      }),
    };

    return await this.ordersService.findAll(filters);
  }

  @Get('user-orders')
  @HttpCode(HttpStatus.OK)
  async getUserOrders(@CurrentUser() user: User) {
    return this.ordersService.getUserOrders(user.id);
  }
}
