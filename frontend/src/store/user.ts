import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserDataState, NFTAsset } from './types';
import { TokenInfo } from '@/types/api';

const initialState: UserDataState = {
  balances: [],
  recentTransactions: [],
  selectedToken: undefined,
  nfts: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<TokenInfo[]>) => {
      state.balances = action.payload || [];
      if (!state.selectedToken && action.payload.length > 0) {
        state.selectedToken = action.payload[0];
      }
      state.error = null;
      state.lastUpdated = Date.now();
    },
    setSelectedToken: (state, action: PayloadAction<TokenInfo>) => {
      state.selectedToken = action.payload;
    },
    setUserDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setUserDataError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetUserData: () => initialState,
    setNFTs: (state, action: PayloadAction<NFTAsset[]>) => {
      state.nfts = action.payload;
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  setBalances,
  setSelectedToken,
  setUserDataLoading,
  setUserDataError,
  resetUserData,
  setNFTs,
} = userDataSlice.actions;

export default userDataSlice.reducer;
