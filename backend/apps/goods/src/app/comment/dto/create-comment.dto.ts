import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  public text: string;

  @IsString()
  @MinLength(50)
  @MaxLength(100)
  public positive: string;

  @IsString()
  @MinLength(50)
  @MaxLength(100)
  public negative: string;

  @IsInt()
  @Min(1)
  @Max(5)
  public grade: number;
}
