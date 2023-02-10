import { Product } from '@backend/shared-types';
import { IsEmail, IsString } from 'class-validator';

export class SendOrderDto {
  @IsEmail()
  adminEmail: string;

  @IsString()
  totalSum: string;

  @IsString()
  totalProduct: string;

  public products: Product[]
}
