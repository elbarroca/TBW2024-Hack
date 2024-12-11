import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useAppSelector } from '@/store';
import { WalletList } from './WalletList';
import { ConnectedWallet } from './ConnectedWallet';
import { UiWallet, useWallets } from '@wallet-standard/react';
import { useMemo } from 'react';

export function WalletPicker() {
    const { user, account } = useAppSelector((state) => state.auth);
    const wallets = useWallets() as UiWallet[];
    const connectedWallet = useMemo(() => wallets.find((x) => account && x.accounts.length > 0 && x.accounts[0].address === account), [wallets, account]);

    if (user && connectedWallet) {
        return <ConnectedWallet connectedWallet={connectedWallet}/>;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Connect wallet <Wallet className="w-4 h-4 ml-2" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="flex flex-col gap-8">
                    <WalletList wallets={wallets} />
                </div>
            </PopoverContent>
        </Popover>
    );
}
