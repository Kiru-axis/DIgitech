import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class DeleteProductWishlistDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
