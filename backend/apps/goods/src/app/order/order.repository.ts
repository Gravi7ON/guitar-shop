import { Injectable, Logger } from '@nestjs/common';
import { Order } from '@backend/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './queries/order.query';
import { OrderMessageException, OrderQueryDefault } from './order.constant';
import { CRUDRepository } from '@backend/core';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, number, Order> {
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

  public async update(orderId: number, item: Pick<Order, 'totalProduct'|'totalSum'>): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: {id: orderId},
      data: {
        ...item
      },
      include: {
        products: true
      }
    });

    return updatedOrder;
  }

  public async findById(orderId: number): Promise<Order> {
    return this.prisma.order.findFirst({
      where: {id: orderId},
      include: {
        products: true
      }
    });
  }

  public async findAll({page, sortField}: OrderQuery): Promise<Order[] | null> {
    let limit: number;
    if (page) {
      limit = OrderQueryDefault.CountLimit
    }

    return this.prisma.order.findMany({
      take: page ? limit : undefined,
      include: {
        products: true
      },
      orderBy: sortField === 'totalSum' ? [
        {
          totalSum: 'desc'
        }
      ] : [
          {
            createdAt: 'desc'
          }
        ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async destroy(id: number): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: {
          id
        }
      });
    } catch(error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        Logger.log(
          OrderMessageException.NotFound
        );
      }
    }
  }
}
