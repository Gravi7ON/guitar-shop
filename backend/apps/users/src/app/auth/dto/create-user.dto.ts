import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { AuthUserMessageException } from '../auth.constant';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  public name: string;

  @IsEmail(
    {},
    {message: AuthUserMessageException.EmailNotValid as string}
  )
  public email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;

  @IsOptional()
  @IsBoolean()
  public isAdmin: boolean;
}
