import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TokenInfo, Payment } from '@/api/types'

interface UserDataState {
  balances: TokenInfo[]
  selectedToken?: TokenInfo
  recentTransactions: Payment[]
  isLoading: boolean
  error: string | null
  lastUpdated: number | null
}

const initialState: UserDataState = {
  balances: [],
  selectedToken: undefined,
  recentTransactions: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<TokenInfo[]>) => {
      state.balances = action.payload
      if (!state.selectedToken && action.payload.length > 0) {
        state.selectedToken = action.payload[0]
      }
      state.error = null
      state.lastUpdated = Date.now()
    },
    setSelectedToken: (state, action: PayloadAction<TokenInfo>) => {
      state.selectedToken = action.payload
    },
    setTransactions: (state, action: PayloadAction<Payment[]>) => {
      state.recentTransactions = action.payload
      state.error = null
      state.lastUpdated = Date.now()
    },
    setUserDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    setUserDataError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    resetUserData: () => initialState
  }
})

export const { 
  setBalances, 
  setSelectedToken, 
  setTransactions, 
  setUserDataLoading,
  setUserDataError,
  resetUserData 
} = userDataSlice.actions

export default userDataSlice.reducer