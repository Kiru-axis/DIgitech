import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @Length(4)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(4)
  @IsNotEmpty()
  password: string;
}

export class ResetPasswordDto {
  @Length(4)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
