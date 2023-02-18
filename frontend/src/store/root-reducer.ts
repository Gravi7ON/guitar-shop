import {combineReducers} from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { productData } from './product-data/product-data';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpaceStore.User]: userProcess.reducer,
  [NameSpaceStore.Product]: productData.reducer
});
