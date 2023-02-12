import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { AmountOfString, ProductType } from '@backend/shared-types';
import { ProductMessageException } from '../product.constant';

export class CreateProductDto {
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(20)
  @MaxLength(1024)
  description: string;

  @IsPositive()
  @Min(100)
  @Max(1_000_000)
  cost: number;

  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/, {
    message: ProductMessageException.BadFormat
  })
  image?: string;

  @IsOptional()
  createdAt?: Date;

  @IsString()
  @IsEnum(ProductType)
  productType: string;

  @IsString()
  @MinLength(5)
  @MaxLength(40)
  vendorCode: string;

  @IsNumber()
  @IsEnum(AmountOfString)
  amountOfString: number
}
