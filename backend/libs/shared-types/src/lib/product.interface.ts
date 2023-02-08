import { AmountOfString } from './amount-string.enum';
import { Comment } from './comment.interface';
import { Order } from './order.interface';

export interface Product {
  id?: number
  title: string;
  description: string;
  image: string;
  productType: string;
  vendorCode: string;
  rating?: number;
  amountOfString: AmountOfString;
  amountOfReview?: number;
  cost: number;
  createdAt?: Date;
  comments?: Comment[];
  orders?: Order[];
}
