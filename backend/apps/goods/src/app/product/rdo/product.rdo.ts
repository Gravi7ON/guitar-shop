import { Expose, Transform } from 'class-transformer';
import { Comment } from '@backend/shared-types';

export class ProductRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public cost: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public image: string;

  @Expose()
  public productType: string;

  @Expose()
  public rating: number;

  @Expose()
  public amountOfString: number;

  @Expose()
  public amountOfReview: number;

  @Expose()
  @Transform(({value}) => value.length)
  public comments: Comment[];

  @Expose()
  public vendorCode: string;
}
