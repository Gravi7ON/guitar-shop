import { Comment } from '@backend/shared-types';
import { Entity } from '@backend/core';

export class CommentEntity implements Entity<CommentEntity>, Comment {
  public id: number;
  public text: string;
  public userId: string;
  public createdAt: Date;
  public productId: number;
  public grade: number;
  public positive: string;
  public negative: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment) {
    this.id = entity.id;
    this.text = entity.text;
    this.userId = entity.userId;
    this.createdAt = entity.createdAt;
    this.productId = entity.productId;
    this.grade = entity.grade;
    this.positive = entity.positive;
    this.negative = entity.negative;
  }

  public toObject(): CommentEntity {
    return {
      ...this
    }
  }
}
