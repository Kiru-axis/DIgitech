import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateColorDto) {
    return this.prisma.color.create({ data: { name: dto.name.toLowerCase() } });
  }

  async findAll() {
    return this.prisma.color.findMany();
  }

  async findOne(id: string) {
    const color = await this.prisma.color.findUnique({ where: { id } });
    if (!color) throw new BadRequestException('Color not found');
    return color;
  }
  async remove(id: string) {
    await this.findOne(id);
    const del = await this.prisma.color.delete({ where: { id } });
    return del;
  }
}
