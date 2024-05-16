import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EnquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEnquiryDto) {
    return this.prisma.enquiry.create({ data: { ...dto } });
  }

  async findAll() {
    return this.prisma.enquiry.findMany();
  }

  async findOne(id: string) {
    const enquiry = await this.prisma.enquiry.findUnique({ where: { id } });
    if (!enquiry) throw new NotFoundException('Enquiry not found');
    return enquiry;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.enquiry.delete({ where: { id } });
  }
}
