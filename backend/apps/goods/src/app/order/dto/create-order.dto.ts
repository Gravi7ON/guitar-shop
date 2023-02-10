import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Min, ValidateNested } from 'class-validator';

class ProductDto {
  @IsNumber()
  id: number;

  @IsPositive()
  @Min(1)
  amount: number;
}

export class CreateOrderDto {
  @ValidateNested({each: true})
  @Type(() => ProductDto)
  public products: ProductDto[];
}
