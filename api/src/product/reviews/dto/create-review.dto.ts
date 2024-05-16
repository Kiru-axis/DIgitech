import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsPositive()
  @IsNotEmpty()
  star: number;
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class GetReviewDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
