import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@backend/shared-types';
import { CommentQuery } from './queries/comment.query';
import axios from 'axios';
import { CommentMessageException, PRODUCT_URL } from './comment.constant';

type UserAndProductLink = {
  productId: number;
  userId: string;
}

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(dto: CreateCommentDto, link: UserAndProductLink): Promise<Comment | null> {
    try {
      await axios.get(`${PRODUCT_URL}${link.productId}`);
    } catch {
      throw new NotFoundException(CommentMessageException.ProductNotFound);
    }

    const commentEntity = new CommentEntity({
      ...dto,
      ...link
    });

    return this.commentRepository.create(commentEntity);
  }

  async findComments(query: CommentQuery, productId: number): Promise<Comment[] | null> {
    try {
      await axios.get(`${PRODUCT_URL}${productId}`);
    } catch {
      throw new NotFoundException(CommentMessageException.ProductNotFound);
    }

    const existedComments = await this.commentRepository.find(query, productId);

    if (!existedComments.length) {
      throw new NotFoundException(CommentMessageException.CommentNotFound);
    }

    return existedComments;
  }
}
