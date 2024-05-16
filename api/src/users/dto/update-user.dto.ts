import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './index';
import { SignupDto } from '../../auth/dto/index.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
export class UpdateUserDto extends PartialType(SignupDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;
}
