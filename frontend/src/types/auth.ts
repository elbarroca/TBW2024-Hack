import type { User } from './user';

export enum LoginStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  IN = 'IN',
  OUT = 'OUT',
}

export interface AuthState {
  user: User | null;
  loginStatus: LoginStatus;
  address: string | null;
  isLoading: boolean;
  error: string | null;
} 