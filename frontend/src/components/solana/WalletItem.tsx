import { memo, useCallback } from 'react';
import { UiWallet } from '@wallet-standard/react';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useToast } from '@/hooks/useToast';
import { StandardConnect } from '@wallet-standard/core';

interface WalletItemProps {
    wallet: UiWallet;
}

export const WalletItem = memo(({ wallet }: WalletItemProps) => {
    const { login } = useWalletAuth();
    const { toast } = useToast();
    
    const handleConnect = useCallback(async () => {
        try {
            if (wallet.features?.includes(StandardConnect)) {
                await wallet.connect();
            }
            await login();
        } catch (error) {
            console.error('Connection error:', error);
            toast({
                title: 'Connection Failed',
                description: error instanceof Error ? error.message : 'Failed to connect wallet',
                variant: 'destructive'
            });
        }
    }, [wallet, login, toast]);
    
    return (
        <div
            role="button"
            className="flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-full py-4 px-5 hover:border-indigo-600 transition-colors cursor-pointer"
            onClick={handleConnect}
        >
            <p className="text-dark/50 text-base">{wallet.name}</p>
            {wallet.icon && <img src={wallet.icon} width={40} height={40} alt={wallet.name} />}
        </div>
    );
});

WalletItem.displayName = 'WalletItem'; 