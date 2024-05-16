import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTagDto) {
    return this.prisma.tag.create({ data: { name: dto.name.toLowerCase() } });
  }

  async findAll() {
    return this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) throw new BadRequestException('Tag not found');
    return tag;
  }
  async remove(id: string) {
    await this.findOne(id);
    const del = await this.prisma.tag.delete({ where: { id } });
    return del;
  }
}
