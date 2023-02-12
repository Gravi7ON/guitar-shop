import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { AmountOfString, ProductType } from '@backend/shared-types';
import { ProductMessageException } from '../product.constant';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(1024)
  description?: string;

  @IsOptional()
  @IsPositive()
  @Min(100)
  @Max(1_000_000)
  cost?: number;

  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/, {
    message: ProductMessageException.BadFormat
  })
  image?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @IsEnum(ProductType)
  productType?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  vendorCode?: string;

  @IsOptional()
  @IsNumber()
  @IsEnum(AmountOfString)
  amountOfString?: number
}
