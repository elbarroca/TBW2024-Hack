import { useContext } from 'react';
import { SelectedWalletAccountContext } from '@/contexts/solana/SelectedWalletAccountContext';

export function useSelectedWalletAccount() {
    return useContext(SelectedWalletAccountContext);
} 