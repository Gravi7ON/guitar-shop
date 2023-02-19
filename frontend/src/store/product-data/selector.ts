import { NameSpaceStore } from 'src/constant';
import { Product } from 'src/types/product';
import { State } from 'src/types/state';

export const getLoadedProductsStatus = (state: State): boolean => state[NameSpaceStore.Product].isProductsLoaded;

export const getProducts = (state: State): Product[] | [] => state[NameSpaceStore.Product].products;

export const getInitialProducts = (state: State): Product[] | [] => state[NameSpaceStore.Product].initialProducts;
