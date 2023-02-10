import { OrderProduct } from '@backend/shared-types';
import { Entity } from '@backend/core';

export class OrderProductEntity implements Entity<OrderProductEntity>, OrderProduct {
  public id: number;
  public createdAt: Date;
  public sum: number;
  public amount: number;
  public productId: number;
  public orderId: number;
  public cost: number;

  constructor(order: OrderProduct) {
    this.fillEntity(order);
  }

  public fillEntity(entity: OrderProduct) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.sum = entity.sum;
    this.amount = entity.amount;
    this.productId = entity.productId;
    this.orderId = entity.orderId;
    this.cost = entity.cost
  }

  public toObject(): OrderProductEntity {
    return {
      ...this
    }
  }
}
