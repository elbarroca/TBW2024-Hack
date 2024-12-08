import { useWallets } from '@wallet-standard/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useAppSelector } from '@/store';
import { WalletList } from './WalletList';
import { ConnectedWallet } from './ConnectedWallet';

export function WalletPicker() {
    const { user } = useAppSelector((state) => state.auth);

    if (user) {
        return <ConnectedWallet />;
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
                    <WalletList />
                </div>
            </PopoverContent>
        </Popover>
    );
}
