import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../product/guards/jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

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
}
