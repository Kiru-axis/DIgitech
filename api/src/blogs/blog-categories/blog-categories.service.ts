import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBlogCategoryDto) {
    return this.prisma.blogCategory.create({ data: { ...dto } });
  }

  async findAll() {
    return this.prisma.blogCategory.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.blogCategory.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('Blog category not found');
    return category;
  }

  async update(id: string, dto: UpdateBlogCategoryDto) {
    await this.findOne(id);
    return this.prisma.blogCategory.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.blogCategory.delete({ where: { id } });
  }
}
