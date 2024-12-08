import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginStatus } from './types';
import type { AuthState } from './types';
import { User } from '@/types/user';
import type { MessageModifyingSigner, TransactionModifyingSigner } from '@solana/signers';
import { Wallet } from './types';

const initialState: AuthState = {
  loginStatus: LoginStatus.IDLE,
  user: null,
  wallet: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<Wallet | null>) => {
      // Only store serializable properties of the wallet
      if (action.payload) {
        state.wallet = {
          name: action.payload.name,
          version: action.payload.version,
          icon: action.payload.icon,
          chain: action.payload.chain,
          features: action.payload.features,
          account: action.payload.account,
        };
      } else {
        state.wallet = null;
      }
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
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
  },
});

export const {
  setUser,
  setWallet,
  setLoginStatus,
  setAuthLoading,
  setAuthError,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
