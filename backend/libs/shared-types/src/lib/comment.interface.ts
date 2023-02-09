export interface Comment {
  id?: number;
  createdAt?: Date;
  text: string;
  userId?: string;
  grade: number;
  positive: string;
  negative: string;
  productId?: number;
}
