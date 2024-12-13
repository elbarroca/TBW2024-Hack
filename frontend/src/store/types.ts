import type { TokenInfo, Payment } from '@/types/api';
import { User } from '@/types/user';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { Api } from '@reduxjs/toolkit/query/react';

export enum LoginStatus {
    IDLE = 'IDLE',
    IN = 'IN',
    OUT = 'OUT'
}

export interface AuthState {
    loginStatus: LoginStatus;
    user: User | null;
    account: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface NFTAsset {
  id: string;
  owner: string;
  content: {
    json_uri: string;
    metadata: {
      name: string;
      description: string;
      image: string;
    };
  };
}

export interface UserDataState {
    balances: TokenInfo[];
    selectedToken?: TokenInfo;
    recentTransactions: Payment[];
    nfts: NFTAsset[];
    isLoading: boolean;
    error: string | null;
    lastUpdated: number | null;
}

export type ApiType = Api<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    Record<string, never>,
    'api',
    string
>;