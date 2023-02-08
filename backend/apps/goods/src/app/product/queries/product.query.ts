import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ClientQueryProduct } from '../product.constant';

export class ProductQuery {
  @Transform(({ value } ) => +value || ClientQueryProduct.DefaultLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = ClientQueryProduct.DefaultLimit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = ClientQueryProduct.DefaultSortDirection;

  @IsIn(['createdAt', 'cost', 'rating'])
  @IsOptional()
  public sortField: 'createdAt' | 'cost' | 'rating' = ClientQueryProduct.DefaultSortField;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
