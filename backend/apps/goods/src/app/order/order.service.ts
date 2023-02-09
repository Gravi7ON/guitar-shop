import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../product/product.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
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

    const orderedGoodsEntities = []
    for (let i = 0; i < orderedGoods.length; i++) {
      orderedGoodsEntities.push({
        productId: orderedGoods[i].id,
        cost: orderedGoods[i].cost,
        amount: dto.products[i].amount,
        sum: orderedGoods[i].cost * dto.products[i].amount,
        orderId: newOrder.id
      })
    }

    for await (const productOrdered of orderedGoodsEntities) {
      this.orderRepository.createOrderedProduct(productOrdered)
    }

    this.orderRepository.update({
      totalProduct: orderedGoodsEntities.length,
      totalSum: orderedGoodsEntities.reduce((sum, product) => sum += product.amount, 0)
    }, newOrder.id);
  }
}
