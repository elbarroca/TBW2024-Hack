import type { User, TokenInfo, Payment } from '@/types/api';

export enum LoginStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  IN = 'IN',
  OUT = 'OUT',
}

export interface AuthState {
  user: User | null;
  loginStatus: LoginStatus;
  address: string;
  error: string | null;
  isLoading: boolean;
}

export interface UserDataState {
  balances: TokenInfo[];
  selectedToken?: TokenInfo;
  recentTransactions: Payment[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
} 