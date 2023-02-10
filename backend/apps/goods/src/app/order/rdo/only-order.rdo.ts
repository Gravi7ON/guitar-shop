import { Expose } from 'class-transformer';

export class OnlyOrderRdo {
  @Expose()
  public userId: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public id: number;

  @Expose()
  public totalSum: number;

  @Expose()
  public totalProduct: string;
}
