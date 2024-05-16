import { PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(4)
  code: string;

  @IsDateString()
  @IsNotEmpty()
  expiresAt: Date;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  discount: number;
}

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
