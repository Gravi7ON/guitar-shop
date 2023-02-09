import { Order, OrderProduct } from '@backend/shared-types';
import { Entity } from '@backend/core';

export class OrderEntity implements Entity<OrderEntity>, Order {
  public id: number;
  public createdAt: Date;
  public userId: string;
  public totalSum: number;
  public totalProduct: number;
  public products: OrderProduct[];

  constructor(order: Order) {
    this.fillEntity(order);
  }

  public fillEntity(entity: Order) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.userId = entity.userId;
    this.totalSum = entity.totalSum;
    this.totalProduct = entity.totalProduct;
    this.products = entity.products;
  }

  public toObject(): OrderEntity {
    return {
      ...this
    }
  }
}
