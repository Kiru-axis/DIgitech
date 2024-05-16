import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  color?: string;
}

export class UpdateCartDto {
  @IsString()
  @IsNotEmpty()
  cartId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  quantity: number;
}

export class DeleteCartProductDto {
  @IsString()
  @IsNotEmpty()
  cartId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
