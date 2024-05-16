import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrderCouponDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  coupon?: string;
}
