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

export interface UserDataState {
    balances: TokenInfo[];
    selectedToken?: TokenInfo;
    recentTransactions: Payment[];
    isLoading: boolean;
    error: string | null;
    lastUpdated: number | null;
}

export type ApiType = Api<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    {},
    string
>; 