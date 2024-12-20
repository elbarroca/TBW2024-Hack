import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginStatus } from './types';
import type { AuthState } from './types';
import { User } from '@/types/user';

const initialState: AuthState = {
  loginStatus: LoginStatus.IDLE,
  user: null,
  account: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string | null>) => {
      state.account = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.loginStatus = action.payload ? LoginStatus.IN : LoginStatus.OUT;
    },
    setLoginStatus: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.loginStatus = LoginStatus.OUT;
    },
    resetAuth: () => initialState,
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setUser,
  setAccount,
  setLoginStatus,
  setAuthLoading,
  setAuthError,
  resetAuth,
  clearUser,
} = authSlice.actions;

export default authSlice.reducer;
