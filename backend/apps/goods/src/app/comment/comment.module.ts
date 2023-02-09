import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentQuery } from './queries/comment.query';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentQuery],
})
export class CommentModule {}
