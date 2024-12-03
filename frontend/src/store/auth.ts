import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/user';
import { LoginStatus } from '@/types/auth';

interface AuthState {
  user: User | null;
  loginStatus: LoginStatus;
  publicKey: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loginStatus: LoginStatus.IDLE,
  publicKey: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loginStatus = action.payload ? LoginStatus.IN : LoginStatus.OUT;
      state.error = null;
    },
    setPublicKey: (state, action: PayloadAction<string | null>) => {
      state.publicKey = action.payload;
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
  setPublicKey,
  setAuthLoading,
  setAuthError,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
