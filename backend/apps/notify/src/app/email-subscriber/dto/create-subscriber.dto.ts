import { IsEmail, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  loginLink: string;

  @IsString()
  name: string;
}
