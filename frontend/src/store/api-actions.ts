import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AppRoute, ProductQuery } from 'src/constant';
import { saveToken } from 'src/services/token.storage';
import { FetchProduct, Product } from 'src/types/product';
import { AppDispatch, State } from 'src/types/state';
import { CreateUser, LoginUser, User } from 'src/types/user';
import { redirectToRoute } from './actions';
import { serverErrorHandler } from './server-error.handler';

type ExtraArg = {
  usersApi: AxiosInstance;
  goodsApi: AxiosInstance;
}

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: ExtraArg
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra}) => {
    const {data} = await extra.usersApi.get(APIRoute.CheckAuth);
    return data;
  }
);

export const userRegisterAction = createAsyncThunk<void, CreateUser, {
  dispatch: AppDispatch,
  state: State,
  extra: ExtraArg
}>(
  'user/register',
  async (createUser, {dispatch, extra}) => {
    try {
      await extra.usersApi.post(APIRoute.SignUp, createUser);
      dispatch(redirectToRoute(AppRoute.Catalog));
      toast.info(`You were successfully register`);
    } catch (err) {
      serverErrorHandler(err as AxiosError);
    }
  }
);

export const userLoginAction = createAsyncThunk<void, LoginUser, {
  dispatch: AppDispatch,
  state: State,
  extra: ExtraArg
}>(
  'user/login',
  async (loginUser, {dispatch, extra}) => {
    try {
      const {data} = await extra.usersApi.post(APIRoute.SignIn, loginUser);
      saveToken(data.accessToken);
      await dispatch(checkAuthAction());
      dispatch(redirectToRoute(AppRoute.Catalog));
    } catch (err) {
      serverErrorHandler(err as AxiosError);
    }
  }
);

export const fetchProductsAction = createAsyncThunk<FetchProduct, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: ExtraArg
}>(
  'data/fetchProducts',
  async (query, {dispatch, extra}) => {
    const {data: products} = await extra.goodsApi.get<Product[]>(`${APIRoute.Products}${query ? query : ProductQuery.Default}`);

    return {products};
  }
);
