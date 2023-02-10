import { Module } from '@nestjs/common';
import { OrderProductRepository } from './order-product.repository';

@Module({
  providers: [OrderProductRepository],
  exports: [OrderProductRepository]
})
export class OrderProductModule {}
