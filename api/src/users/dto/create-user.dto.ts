import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsPositive()
  zipCode: number;

  @IsString()
  @IsNotEmpty()
  address1: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address2?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  other?: string;
}
