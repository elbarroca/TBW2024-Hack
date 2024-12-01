import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { User } from 'lucide-react';

export function ConnectWalletButton() {
    const { publicKey, disconnect } = useWallet();

    if (publicKey) {
        return (
            <div
                onClick={disconnect}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 cursor-pointer hover:bg-purple-100 transition-colors"
            >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">
                    {`${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}`}
                </span>
            </div>
        );
    }

    return <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !h-10" />;
}
