import { configureStore } from '@reduxjs/toolkit';
import { createUserAPI, RESTService } from 'src/services/app.api';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const usersApi = createUserAPI(RESTService.Users);
export const goodsApi = createUserAPI(RESTService.Goods);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          usersApi,
          goodsApi
        },
      },
    }).concat(redirect)
});
