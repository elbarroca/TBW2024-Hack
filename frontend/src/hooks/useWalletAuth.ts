import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setUser, setAuthError, setAuthLoading, setLoginStatus, resetAuth } from '@/store/auth';
import { LoginStatus } from '@/types/auth';
import { useRequestNonceMutation, useVerifySignatureMutation, useLogoutMutation } from '@/api/endpoints/auth';
import { useWalletConnection } from './useWalletConnection';
import { useLazyGetBalancesQuery } from '@/api/endpoints/solana';
import { setBalances, setUserDataLoading, resetUserData } from '@/store/user';
import bs58 from 'bs58';
import { useSelectedWalletAccount } from './useSelectedWalletAccount';
import { UiWallet } from '@wallet-standard/react';

const MESSAGE_PREFIX = 'Sign this message to log in to Mentora // ';

export function useWalletAuth(wallet: UiWallet) {
    const dispatch = useAppDispatch();
    const { loginStatus } = useAppSelector(state => state.auth);
    const { selectedAccount } = useSelectedWalletAccount();
    
    const [requestNonce] = useRequestNonceMutation();
    const [verifySignature] = useVerifySignatureMutation();
    const [logoutMutation] = useLogoutMutation();
    const [fetchBalances] = useLazyGetBalancesQuery();

    const login = useCallback(async () => {
        if (loginStatus !== LoginStatus.IDLE || !selectedAccount) return;

        try {
            dispatch(setAuthLoading(true));
            
            if (!messageSigner) {
                throw new Error('Wallet not properly connected');
            }

            // Get nonce from server
            const { nonce } = await requestNonce({ 
                address: selectedAccount.address
            }).unwrap();
            
            // Sign message
            const message = new TextEncoder().encode(MESSAGE_PREFIX + nonce);
            const [signedMessage] = await messageSigner.modifyAndSignMessages([
                { content: message, signatures: {} }
            ]);
            
            // Get signature
            const [[_, signature]] = Object.entries(signedMessage.signatures);
            if (!signature) throw new Error('Failed to sign message');

            // Verify signature
            const { user } = await verifySignature({ 
                address: selectedAccount.address,
                nonce,
                signature: bs58.encode(signature)
            }).unwrap();

            dispatch(setUser(user));
            dispatch(setLoginStatus(LoginStatus.IN));

            // Fetch user balances
            dispatch(setUserDataLoading(true));
            const response = await fetchBalances(selectedAccount.address).unwrap();
            dispatch(setBalances(response?.balances || []));

        } catch (error) {
            console.error('Auth error:', error);
            dispatch(setAuthError(error instanceof Error ? error.message : 'Authentication failed'));
            await logout();
        } finally {
            dispatch(setAuthLoading(false));
            dispatch(setUserDataLoading(false));
        }
    }, [dispatch, loginStatus, messageSigner, selectedAccount, requestNonce, verifySignature, fetchBalances]);

    const logout = useCallback(async () => {
        try {
            dispatch(setLoginStatus(LoginStatus.OUT));
            await logoutMutation().unwrap();
            dispatch(resetAuth());
            dispatch(resetUserData());
        } catch (error) {
            console.error('Logout error:', error);
            dispatch(resetAuth());
            dispatch(resetUserData());
        }
    }, [dispatch, logoutMutation]);

    return {
        login,
        logout,
        isAuthenticated: loginStatus === LoginStatus.IN,
        isLoading: useAppSelector(state => state.auth.isLoading),
        error: useAppSelector(state => state.auth.error),
        loginStatus,
        selectedAccount,
    };
} 