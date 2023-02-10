import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { ProductModule } from '../product/product.module';
import { OrderProductModule } from '../order-product/order-product.module';

@Module({
  imports: [
    ProductModule,
    OrderProductModule
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
