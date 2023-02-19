import {combineReducers} from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { controlElement } from './control-element/control-element';
import { productData } from './product-data/product-data';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpaceStore.User]: userProcess.reducer,
  [NameSpaceStore.Product]: productData.reducer,
  [NameSpaceStore.ControlElement]: controlElement.reducer
});
