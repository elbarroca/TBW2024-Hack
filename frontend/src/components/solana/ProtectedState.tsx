import { Wallet, CoinsIcon } from 'lucide-react';
import { WalletPicker } from './WalletPicker';
import { useAppSelector } from '@/store';

export function ProtectedState() {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3">
                    <Wallet className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-semibold">No wallet connected</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Connect your wallet</p>
                <WalletPicker />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-muted p-3">
                <CoinsIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">No tokens found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                This wallet doesn't have any tokens yet
            </p>
        </div>
    );
}
