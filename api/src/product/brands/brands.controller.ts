import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PublicRoute } from 'src/common';
import { Roles } from 'src/common/decorators/role';

@ApiTags('product-brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @PublicRoute()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createColorDto: CreateBrandDto) {
    return this.brandsService.create(createColorDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateBrandDto,
  ) {
    await this.brandsService.findOne(id);
    return this.brandsService.update(id, updateColorDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.brandsService.findOne(id);
    return this.brandsService.remove(id);
  }
}
