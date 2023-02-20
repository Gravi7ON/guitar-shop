import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { Product } from 'src/types/product';
import { ProductData } from 'src/types/state';
import { fetchProductsAction } from '../api-actions';

const initialState: ProductData = {
  products: [],
  initialProducts: [],
  isProductsLoaded: true
};

export const productData = createSlice({
  name: NameSpaceStore.Product,
  initialState,
  reducers: {
    filterProduct(state, action) {
      const {from, to, products} = action.payload;
      if (from && to && (Number(to) > Number(from))) {
        const filteredProducts = products.filter((product: Product) => {
          return (product.cost >= Number(from)) && (product.cost <= Number(to));
        });

        state.products = filteredProducts;
        return;
      }

      if (from) {
        const filteredProducts = products.filter((product: Product) => {
          return product.cost >= Number(from);
        });

        state.products = filteredProducts;
        return;
      }

      if (to) {
        const filteredProducts = products.filter((product: Product) => {
          return product.cost <= Number(to);
        });

        state.products = filteredProducts;
        return;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        if (!state.initialProducts.length) {
          state.initialProducts = action.payload.products;
        }
        state.products = action.payload.products ?? [];
        state.isProductsLoaded = false;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsLoaded = true;
      })
  }
});

export const { filterProduct } = productData.actions;
