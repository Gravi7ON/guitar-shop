import { fillObject } from '@backend/core';
import { Body, Controller, Param, ParseIntPipe, Post, UseGuards, Request, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './queries/comment.query';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async create(@Body() dto: CreateCommentDto, @Param('id', ParseIntPipe) productId: number, @Request() req) {
    const newComment = await this.commentService.createComment(dto, {
      userId: req.user.id,
      productId
    });

    return fillObject(CommentRdo, newComment);
  }

  @Get('/:id')
  async index(@Query() query: CommentQuery, @Param('id', ParseIntPipe) productId: number) {
    const comments = await this.commentService.findComments(query, productId);

    return fillObject(CommentRdo, comments);
  }
}
