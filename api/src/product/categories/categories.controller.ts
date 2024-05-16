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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PublicRoute } from 'src/common';
import { Roles } from 'src/common/decorators/role';

@ApiTags('product-categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @PublicRoute()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createColorDto: CreateCategoryDto) {
    return this.categoriesService.create(createColorDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.findOne(id);
    return this.categoriesService.update(id, updateColorDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.categoriesService.findOne(id);
    return this.categoriesService.remove(id);
  }
}
