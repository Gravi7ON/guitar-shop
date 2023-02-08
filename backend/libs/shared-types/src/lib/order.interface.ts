export interface Order {
  id?: number;
  createdAt?: Date;
  userId: string;
  amount: number;
  cost: number;
  sum: number;
  productId: number;
  totalOrderId: number
}
