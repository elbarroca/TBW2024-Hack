import { StandardConnect, StandardDisconnect } from '@wallet-standard/core';
import { UiWallet } from '@wallet-standard/react';
import { ErrorBoundary } from 'react-error-boundary';
import { WalletItem } from './WalletItem';
import { useMemo } from 'react';

export function WalletList( { wallets }: { wallets: UiWallet[] }) {
    const connectableWallets = useMemo(() => {
        if (!wallets) return [];
        
        // Create a map to ensure unique wallets
        const uniqueWallets = new Map<string, UiWallet>();
        
        wallets.forEach((wallet: UiWallet) => {
            if (wallet?.features?.includes(StandardConnect) && 
                wallet?.features?.includes(StandardDisconnect) &&
                wallet?.features?.includes('solana:signIn')) {
                const key = `${wallet.name}-${wallet.version}`;
                if (!uniqueWallets.has(key)) {
                    uniqueWallets.set(key, wallet);
                }
            }
        });

        return Array.from(uniqueWallets.values());
    }, [wallets]);

    if (!wallets?.length) {
        return (
            <div className="text-orange-500 p-4">
                This browser has no wallets installed.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {connectableWallets.map((wallet) => (
                <ErrorBoundary
                    key={`${wallet.name}-${wallet.version}`}
                    fallback={<div>Error loading wallet</div>}
                >
                    <WalletItem wallet={wallet} />
                </ErrorBoundary>
            ))}
        </div>
    );
} 