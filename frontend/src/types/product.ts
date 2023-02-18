import { ProductData } from './state';

export type Product = {
  id: number;
  title: string;
  description: string;
  cost: number;
  createdAt: string;
  image: string;
  productType: string;
  rating: number;
  amountOfString: number;
  amountOfReview: number;
  comments: number;
  vendorCode: string;
}

export type FetchProduct = Pick<ProductData, 'products'>
