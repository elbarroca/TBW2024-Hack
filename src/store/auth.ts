import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/api/types'

export enum LoginStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  IN = 'IN',
  OUT = 'OUT',
}

interface AuthState {
  user: User | null
  loginStatus: LoginStatus
  address: string
  error: string | null
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  loginStatus: LoginStatus.IDLE,
  address: '',
  error: null,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.error = null
    },
    setLoginStatus: (state, action: PayloadAction<LoginStatus>) => {
      state.loginStatus = action.payload
      if (action.payload === LoginStatus.IN) {
        state.error = null
      }
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
      state.loginStatus = LoginStatus.OUT
    },
    resetAuth: () => initialState,
  },
})

export const { 
  setUser, 
  setLoginStatus, 
  setAddress, 
  setAuthLoading,
  setAuthError,
  resetAuth 
} = authSlice.actions

export default authSlice.reducer