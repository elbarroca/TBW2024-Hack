import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/user';
import { LoginStatus, AuthState } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  loginStatus: LoginStatus.IDLE,
  address: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    setLoginStatus: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload;
      if (action.payload === LoginStatus.IN) {
        state.error = null;
      }
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
  },
});

export const {
  setUser,
  setLoginStatus,
  setAuthLoading,
  setAuthError,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
