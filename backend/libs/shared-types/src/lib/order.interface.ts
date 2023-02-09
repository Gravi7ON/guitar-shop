export interface OrderProduct {
  id: number;
  amount: number;
  sum?: number;
  createdAt?: Date;
  cost?: number;
  productId?: number;
  orderId?: number
}
export interface Order {
  id?: number;
  createdAt?: Date;
  userId?: string;
  products: OrderProduct[];
  totalSum?: number;
  totalProduct?: number;
}
