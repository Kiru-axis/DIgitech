import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { prismaBlogResponse } from './utils';

export interface IBlogFilters {
  cat: string;
  limit: number;
  page: number;
}

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: IBlogFilters) {
    const limit = 15;

    return this.prisma.blog.findMany({
      select: {
        ...prismaBlogResponse,
      },
      where: {
        Category: { name: { contains: filters.cat, mode: 'insensitive' } },
      },
      take: filters.limit || limit,
      skip: ((filters.page || 1) - 1) * (filters.limit || limit),
    });
  }

  async create(dto: CreateBlogDto, authorId: string, image?: string) {
    await this.findCategoryById(dto.categoryId);
    return this.prisma.blog.create({
      data: {
        ...dto,
        authorId,
        image: image ? image : null,
      },
      select: {
        ...prismaBlogResponse,
      },
    });
  }

  async findOne(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      select: {
        ...prismaBlogResponse,
      },
    });
    if (!blog) throw new NotFoundException('Blog not found');

    await this.prisma.blog.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return blog;
  }

  async update(id: string, dto: UpdateBlogDto) {
    await this.findOne(id);
    await this.findCategoryById(dto.categoryId);
    return this.prisma.blog.update({
      where: { id },
      data: { ...dto },
      select: {
        ...prismaBlogResponse,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.blog.delete({
      where: { id },
      select: {
        ...prismaBlogResponse,
      },
    });
  }

  // helpers
  private async findCategoryById(id: string) {
    if (id) {
      const category = await this.prisma.blogCategory.findUnique({
        where: { id },
      });
      if (!category)
        throw new BadRequestException('Please select the available category');
      return category;
    }
    return;
  }
}
