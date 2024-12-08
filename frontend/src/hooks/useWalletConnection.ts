import { useCallback, useMemo } from 'react';
import { useWallets } from '@wallet-standard/react';
import { StandardConnect, StandardDisconnect } from '@wallet-standard/core';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetAuth } from '@/store/auth';
import { useSelectedWalletAccount } from './useSelectedWalletAccount';
import { useWalletAccountMessageSigner, useWalletAccountTransactionSigner } from '@solana/react';
import { showError } from './useToast';

export function useWalletConnection() {
    const dispatch = useAppDispatch();
    const wallets = useWallets();
    const [selectedAccount, setSelectedAccount] = useSelectedWalletAccount();
    const { wallet } = useAppSelector(state => state.auth);

    // Get signers based on selected account
    const messageSigner = useMemo(() => 
        selectedAccount ? useWalletAccountMessageSigner(selectedAccount) : null,
        [selectedAccount]
    );

    const transactionSigner = useMemo(() => 
        selectedAccount ? useWalletAccountTransactionSigner(selectedAccount, 'solana:mainnet-beta') : null,
        [selectedAccount]
    );

    const connect = useCallback(async (selectedWallet: any) => {
        try {
            if (!selectedWallet.features?.includes(StandardConnect)) {
                throw new Error('Wallet does not support connection');
            }

            await selectedWallet.connect();
            const accounts = selectedWallet.accounts.get();
            if (accounts.length > 0) {
                setSelectedAccount(accounts[0]);
            }
        } catch (error) {
            console.error('Wallet connection error:', error);
            showError(error instanceof Error ? error.message : 'Failed to connect wallet');
            throw error;
        }
    }, [setSelectedAccount]);

    const disconnect = useCallback(async () => {
        try {
            /*if (selectedAccount?.wallet.features?.includes(StandardDisconnect)) {
                await selectedAccount.wallet.disconnect();
            }*/
            setSelectedAccount(undefined);
            dispatch(resetAuth());
        } catch (error) {
            console.error('Wallet disconnect error:', error);
            showError(error instanceof Error ? error.message : 'Failed to disconnect wallet');
        }
    }, [selectedAccount, setSelectedAccount, dispatch]);

    const getAvailableWallets = useMemo(() => 
        Array.from(new Set(wallets)).filter(wallet => 
            wallet?.features?.includes(StandardConnect) && 
            wallet?.features?.includes(StandardDisconnect)
        ),
        [wallets]
    );

    return {
        wallet,
        selectedAccount,
        messageSigner,
        transactionSigner,
        connect,
        disconnect,
        getAvailableWallets,
        isConnected: !!selectedAccount
    };
} 