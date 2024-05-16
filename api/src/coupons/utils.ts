import { BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';

export function validateCouponDiscount(discount: number) {
  if (discount < 1 || discount >= 100)
    throw new BadRequestException('Discount should range between 1 to 99');
}

export function validateCouponExpiry(dateSet: Date) {
  const check = dayjs().isBefore(dayjs(dateSet));

  if (!check)
    throw new BadRequestException('Please select a date later than now');
}
