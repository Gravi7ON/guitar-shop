import { fillObject } from '@backend/core';
import { Body, Controller, Post, UseGuards, Request, Get, Param, ParseIntPipe, Query, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { OrderQuery } from './queries/order.query';
import { OnlyOrderRdo } from './rdo/only-order.rdo';
import { OrderRdo } from './rdo/order.rdo';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateOrderDto, @Request() req) {
    await this.orderService.createOrder(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('/')
  async findAll(@Query() query: OrderQuery) {
    const existedOrders = await this.orderService.findOrders(query);

    return fillObject(OnlyOrderRdo, existedOrders)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('/:id')
  async find(@Param('id', ParseIntPipe) orderId: number) {
    const existedOrder = await this.orderService.findOrder(orderId);

    return fillObject(OrderRdo, existedOrder)
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.orderService.deleteOrder(id);
  }
}
