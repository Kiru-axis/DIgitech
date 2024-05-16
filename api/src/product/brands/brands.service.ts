import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.brand.findMany();
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async create(dto: CreateBrandDto) {
    return this.prisma.brand.create({ data: { ...dto } });
  }

  async update(id: string, dto: UpdateBrandDto) {
    return this.prisma.brand.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: string) {
    return this.prisma.brand.delete({ where: { id } });
  }
}
