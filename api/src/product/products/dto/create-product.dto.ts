import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class TagColorsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  brandId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagColorsDto)
  colors: TagColorsDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagColorsDto)
  tags: TagColorsDto[];

  @IsOptional()
  @IsNotEmpty()
  images: string[];
}

//  @IsArray()
//   @IsNotEmpty()
//   @ValidateNested({ each: true })
//   @Type(() => ColorTagDto)
//   Tags: ColorTagDto[];
