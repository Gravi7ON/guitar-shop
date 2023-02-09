import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@backend/shared-types';
import { CommentQuery } from './queries/comment.query';

type UserAndProductLink = {
  productId: number;
  userId: string;
}

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(dto: CreateCommentDto, link: UserAndProductLink): Promise<Comment> {
    const commentEntity = new CommentEntity({
      ...dto,
      ...link
    });

    return this.commentRepository.create(commentEntity);
  }

  async findComments(query: CommentQuery, productId: number): Promise<Comment[]> {
    return this.commentRepository.find(query, productId);
  }
}
