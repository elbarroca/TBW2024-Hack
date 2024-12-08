import type { TokenInfo, Payment } from '@/types/api';
import { User } from '@/types/user';
import { UiWalletAccount } from '@wallet-standard/react';
import { 
  SolanaSignMessageInput, 
  SolanaSignMessageOutput,
  SolanaSignTransactionInput, 
  SolanaSignTransactionOutput 
} from '@solana/wallet-standard-features';
import { MessageModifyingSigner, TransactionModifyingSigner } from '@solana/signers';

export enum LoginStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  IN = 'IN',
  OUT = 'OUT',
}

export type Wallet = {
  name: string,
  version: string,
  icon: string,
  chain: string,
  features: string[],
  account: string
}

export interface AuthState {
  user: User | null;
  loginStatus: LoginStatus;
  wallet: Wallet | null;
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