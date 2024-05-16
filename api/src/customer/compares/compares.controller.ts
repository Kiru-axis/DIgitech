import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';

import { ComparesService } from './compares.service';
import {
  CreateCompareDto,
  DeleteProductCompareDto,
} from './dto/create-compare.dto';
import { CurrentUser } from 'src/common';
import { Roles } from 'src/common/decorators/role';

@ApiBearerAuth()
@ApiTags('customer/compares')
@Controller('customer/compares')
export class ComparesController {
  constructor(private readonly compareService: ComparesService) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.compareService.findAll(user.id);
  }

  @Roles(Role.ADMIN)
  @Get('all')
  async findAllAdmin() {
    return this.compareService.findAllAdmin();
  }

  @Post()
  async create(@Body() dto: CreateCompareDto, @CurrentUser() user: User) {
    return this.compareService.create(user.id, dto);
  }

  @Delete()
  async remove(
    @CurrentUser() user: User,
    @Body() dto: DeleteProductCompareDto,
  ) {
    await this.compareService._getProductById(dto.productId);
    const compares = await this.compareService._findWishByProdUserId(
      user.id,
      dto.productId,
    );
    if (user.id === compares.userId) {
      return this.compareService.remove(compares.id);
    }

    throw new ForbiddenException('You cannot peform these operation');
  }

  @Delete('clear')
  async clear(@CurrentUser() user: User) {
    return this.compareService.clear(user.id);
  }
}
