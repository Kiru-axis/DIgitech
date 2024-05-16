import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: { ...dto } });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
