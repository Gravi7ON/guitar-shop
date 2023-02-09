import { Injectable } from '@nestjs/common';
import { Order } from '@backend/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: OrderEntity): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...item.toObject(),
        products: {
          connect: []
        }
      },
      include: {
        products: true
      }
    });
  }

  public async createOrderedProduct(item): Promise<void> {
    await this.prisma.orderProduct.create({
      data: {
        ...item
      }
    });
  }

  public async update(item, orderId): Promise<void> {
    await this.prisma.order.update({
      where: {id: orderId},
      data: {
        ...item
      }
    });
  }

  // public find({limit, sortDirection, page}: CommentQuery, productId: number): Promise<Comment[]> {
  //   return this.prisma.comment.findMany({
  //     where: {productId},
  //     take: limit,
  //     orderBy: [
  //       {
  //         createdAt: sortDirection
  //       }
  //     ],
  //     skip: page > 0 ? limit * (page - 1) : undefined
  //   });
  // }
}
