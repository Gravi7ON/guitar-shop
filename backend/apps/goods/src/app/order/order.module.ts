import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { ProductModule } from '../product/product.module';
import { OrderProductModule } from '../order-product/order-product.module';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { RABBITMQ_SERVICE } from './order.constant';

@Module({
  imports: [
    ProductModule,
    OrderProductModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
