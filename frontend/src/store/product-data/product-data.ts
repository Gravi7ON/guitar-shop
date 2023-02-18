import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { ProductData } from 'src/types/state';
import { fetchProductsAction } from '../api-actions';

const initialState: ProductData = {
  products: [],
  isProductsLoaded: true
};

export const productData = createSlice({
  name: NameSpaceStore.Product,
  initialState,
  reducers: {
    sortProduct(state, action) {
      state.products = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload.products ?? [];
        state.isProductsLoaded = false;
      })
  }
});

export const { sortProduct } = productData.actions
