import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public userId: string;

  @Expose()
  public productId: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public id: number;

  @Expose()
  public grade: number;

  @Expose()
  public positive: string;

  @Expose()
  public negative: string;
}
