import { Expose, Transform } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public isAdmin: boolean;

  @Expose({name: 'createdAt'})
  public registerDate: Date;
}
