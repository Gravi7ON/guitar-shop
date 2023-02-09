import { ValidateNested } from 'class-validator';

interface ProductDto {
  id: number;
  amount: number;
}

export class CreateOrderDto {
  @ValidateNested()
  public products: ProductDto[];
}
