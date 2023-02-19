import { AuthorizationStatus } from 'src/constant';
import { store } from 'src/store/store';
import { Product } from './product';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  name: string;
  isAdmin: boolean;
};

export type ProductData = {
  products: Product[] | [];
  initialProducts: Product[] | [];
  isProductsLoaded: boolean;
}

export type ControlElement = {
  cost: boolean;
  rating: boolean;
  date: boolean;
  asc: boolean;
  desc: boolean;
  from: string;
  to: string;
  acoustic: boolean;
  electric: boolean;
  ukulele: boolean;
  four: boolean;
  six: boolean;
  seven: boolean;
  twelve: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
