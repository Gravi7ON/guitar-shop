import { OrderProduct } from '@backend/shared-types';
import { Expose } from 'class-transformer';

export class OrderRdo {
  @Expose()
  public userId: string;

  @Expose()
  public products: OrderProduct[];

  @Expose()
  public createdAt: Date;

  @Expose()
  public id: number;

  @Expose()
  public totalSum: number;

  @Expose()
  public totalProduct: string;
}
