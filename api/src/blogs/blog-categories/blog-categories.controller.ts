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

import { BlogCategoriesService } from './blog-categories.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { Roles } from 'src/common/decorators/role';
import { Role } from '@prisma/client';
import { PublicRoute } from 'src/common';

@ApiTags('blog-categories')
@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(private readonly blogCategoriesService: BlogCategoriesService) {}

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() dto: CreateBlogCategoryDto) {
    return this.blogCategoriesService.create(dto);
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.blogCategoriesService.findAll();
  }

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogCategoriesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBlogCategoryDto) {
    return this.blogCategoriesService.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogCategoriesService.remove(id);
  }
}
