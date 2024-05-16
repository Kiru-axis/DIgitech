import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompareDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class DeleteProductCompareDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
