import React, {
    createContext,
    useContext,
    useMemo,
    useCallback,
    ReactNode,
    useEffect,
} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { useAppDispatch, useAppSelector } from '@/store';
import {
    useRequestChallengeMutation,
    useSolveChallengeMutation,
    useLazyGetBalancesQuery,
    useLazyGetTransactionsQuery,
} from '@/api';
import {
    resetUserData,
    setBalances,
    setTransactions,
    setUserDataError,
    setUserDataLoading,
} from '@/store/user';
import {
    setLoginStatus,
    LoginStatus,
    setUser,
    setAddress,
    setAuthLoading,
    setAuthError,
} from '@/store/auth';

interface AuthContextType {
    resetAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { publicKey, signMessage, disconnect } = useWallet();
    const loginStatus = useAppSelector((state) => state.auth.loginStatus);
    const [requestChallenge] = useRequestChallengeMutation();
    const [solveChallenge] = useSolveChallengeMutation();
    const [getBalances] = useLazyGetBalancesQuery();
    const [getTransactions] = useLazyGetTransactionsQuery();

    useEffect(() => {
        if (!publicKey) return;
        const address = publicKey.toBase58();

        handleChallenge(address);
    }, [publicKey]);

    const handleChallenge = useCallback(
        async (address: string) => {
            if (!signMessage) return;

            try {
                dispatch(setAuthLoading(true));
                dispatch(setUserDataLoading(true));

                const { challenge } = await requestChallenge({ address }).unwrap();
                const message = new TextEncoder().encode(challenge);
                const signedMessage = await signMessage(message);
                const signature = bs58.encode(signedMessage);

                const { token, user } = await solveChallenge({ address, signature }).unwrap();

                localStorage.setItem('token', token);
                dispatch(setUser(user));
                dispatch(setAddress(address));
                dispatch(setLoginStatus(LoginStatus.IN));

                try {
                    const [balances, transactions] = await Promise.all([
                        getBalances(address).unwrap(),
                        getTransactions({ address, limit: 10 }).unwrap(),
                    ]);

                    dispatch(setBalances(balances));
                    dispatch(setTransactions(transactions));
                } catch (error) {
                    dispatch(setUserDataError('Failed to fetch user data'));
                }
            } catch (error) {
                console.error('Auth failed:', error);
                dispatch(setAuthError('Authentication failed'));
                await resetAuth();
            } finally {
                dispatch(setAuthLoading(false));
                dispatch(setUserDataLoading(false));
            }
        },
        [publicKey, loginStatus, signMessage, getBalances, getTransactions]
    );

    const resetAuth = useCallback(async () => {
        localStorage.removeItem('token');
        await disconnect();
        dispatch(resetUserData());
    }, [dispatch, disconnect]);

    const contextValue = useMemo(
        () => ({
            resetAuth,
        }),
        [resetAuth]
    );

    React.useEffect(() => {
        if (publicKey && loginStatus === LoginStatus.OUT) {
            handleChallenge(publicKey.toBase58());
        }
    }, [publicKey, loginStatus]);

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
