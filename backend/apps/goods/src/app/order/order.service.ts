import { Order } from '@backend/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderProductEntity } from '../order-product/order-product.entity';
import { OrderProductRepository } from '../order-product/order-product.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMessageException } from './order.constant';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderQuery } from './queries/order.query';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderProductRepository: OrderProductRepository
  ) {}

  async createOrder(dto: CreateOrderDto, userId: string): Promise<void> {
    const orderEntity = new OrderEntity({
      ...dto,
      userId
    });

    const newOrder = await this.orderRepository.create(orderEntity);

    const orderedGoods = [];
    for (const product of dto.products) {
      orderedGoods.push(await this.productRepository.findById(product.id))
    }

    const orderedGoodsEntities = [];
    for (let i = 0; i < orderedGoods.length; i++) {
      if (!orderedGoods[i]) {
        continue;
      }

      const orderedProductEntity = new OrderProductEntity({
        productId: orderedGoods[i].id,
        cost: orderedGoods[i].cost,
        amount: dto.products[i].amount,
        sum: orderedGoods[i].cost * dto.products[i].amount,
        orderId: newOrder.id
      });

      orderedGoodsEntities.push(orderedProductEntity.toObject());
    }

    for await (const productOrdered of orderedGoodsEntities) {
      this.orderProductRepository.create(productOrdered);
    }

    this.orderRepository.update(
      newOrder.id,
      orderedGoodsEntities.reduce(
        (sum, product) => sum = {
          totalProduct: sum.totalProduct += product.amount,
          totalSum: sum.totalSum += product.cost * product.amount
        }, {
          totalProduct: 0,
          totalSum: 0
        }
      )
    );
  }

  async findOrder(orderId: number): Promise<Order | null> {
    const existedOrder = await this.orderRepository.findById(orderId);

    if (!existedOrder) {
      throw new NotFoundException(OrderMessageException.NotFound);
    }

    return existedOrder;
  }

  async findOrders(query: OrderQuery): Promise<Order[] | null> {
    const existedOrders = await this.orderRepository.findAll(query);

    if (!existedOrders.length) {
      throw new NotFoundException(OrderMessageException.NoOne);
    }

    return existedOrders;
  }

  async deleteOrder(id: number): Promise<void> {
    this.orderRepository.destroy(id);
  }
}
