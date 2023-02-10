import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderProductEntity } from './order-product.entity';

@Injectable()
export class OrderProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: OrderProductEntity): Promise<void> {
    await this.prisma.orderProduct.create({
      data: {
        ...item
      }
    });
  }
}
