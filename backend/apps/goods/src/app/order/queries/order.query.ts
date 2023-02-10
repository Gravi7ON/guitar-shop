import { IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderQueryDefault } from '../order.constant';

export class OrderQuery {
  @IsIn(['createdAt', 'totalSum'])
  @IsOptional()
  public sortField: 'createdAt' | 'totalSum' = OrderQueryDefault.DefaultSortField;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
