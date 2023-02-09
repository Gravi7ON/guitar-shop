import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@backend/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './queries/comment.query';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<Comment> {
    const newComment = await this.prisma.comment.create({
      data: {
        ...item.toObject()
      }
    });

    const {comments} = await this.prisma.product.findFirst({
      where: {id: Number(item.productId)},
      include: {
        comments: true
      }
    });
    await this.prisma.product.update({
      where: {id: Number(item.productId)},
      data: {
        amountOfReview: comments.length,
        rating: Math.round(
          comments
            .reduce(
              (sum, comment) => sum += comment.grade, 0
            ) / comments.length
        )
      }
    })

    return newComment;
  }

  public find({limit, sortDirection, page}: CommentQuery, productId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {productId},
      take: limit,
      orderBy: [
        {
          createdAt: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined
    });
  }
}
