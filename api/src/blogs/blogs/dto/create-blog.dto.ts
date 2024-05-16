import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  desc: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class BlogQueryDto {
  @IsString()
  @IsOptional()
  cat?: string;
  @IsString()
  @IsOptional()
  page?: string;
  @IsString()
  @IsOptional()
  limit?: string;
}
