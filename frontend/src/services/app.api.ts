import axios, { AxiosInstance } from 'axios';
import { getToken } from './token.storage';

const BackendUrl = {
  Users: 'http://localhost:3333/api/auth',
  Goods: 'http://localhost:3335/api'
} as const;

export enum RESTService {
  Users = 'Users',
  Goods = 'Goods'
}

const REQUEST_TIMEOUT = 5000;

export const createUserAPI = (direction: RESTService): AxiosInstance => {
  const api = axios.create({
    baseURL: BackendUrl[direction],
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
  );

  return api;
};
