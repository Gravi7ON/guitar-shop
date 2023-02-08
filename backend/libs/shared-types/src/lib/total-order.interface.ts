import { Order } from './order.interface';

export interface TotalOrder {
  id?: number;
  createdAt?: Date;
  orders: Order[];
  totalSum: number;
  totalProduct: number;
}
