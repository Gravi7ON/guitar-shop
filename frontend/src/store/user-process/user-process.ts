import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpaceStore } from 'src/constant';
import { UserProcess } from 'src/types/state';
import { checkAuthAction, userLoginAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  name: '',
  isAdmin: false
};

export const userProcess = createSlice({
  name: NameSpaceStore.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.name = action.payload?.name ?? '';
        state.isAdmin = !!action.payload.isAdmin;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(userLoginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(userLoginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
  }
});
