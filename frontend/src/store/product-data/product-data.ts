import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        if (!state.initialProducts.length) {
          state.initialProducts = action.payload.products;
        }
        state.products = action.payload.products ?? [];
        state.isProductsLoaded = false;
      })
  }
});

