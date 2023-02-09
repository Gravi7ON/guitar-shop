import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { CommentQueryDefault } from '../comment.constant'

export class CommentQuery {
  @Transform(({ value } ) => +value || CommentQueryDefault.CountLimit)
  @IsNumber()
  @IsOptional()
  public limit = CommentQueryDefault.CountLimit as number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = CommentQueryDefault.SortDirection;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
