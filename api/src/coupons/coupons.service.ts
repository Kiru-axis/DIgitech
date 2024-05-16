import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';

import { CreateCouponDto } from './dto/index.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateCouponDiscount, validateCouponExpiry } from './utils';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCouponDto) {
    validateCouponDiscount(dto.discount);
    validateCouponExpiry(dto.expiresAt);

    return this.prisma.coupon.create({
      data: {
        discount: dto.discount / 100,
        expiresAt: new Date(dto.expiresAt),
        code: dto.code.toUpperCase(),
      },
    });
  }

  async findAll() {
    return this.prisma.coupon.findMany();
  }

  async findOne(id: string) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundException('Coupon not found');
    if (dayjs().isAfter(coupon.expiresAt))
      throw new BadRequestException('Invalid coupon');
    return coupon;
  }
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.coupon.delete({ where: { id } });
  }
}
