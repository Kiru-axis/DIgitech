import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEnquiryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  mobile: string;
  @IsString()
  @IsNotEmpty()
  comment: string;
}
