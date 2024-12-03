import { useWallet } from '@solana/wallet-adapter-react';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useAppSelector } from '@/store';
import { useAuth } from '@/contexts/AuthProvider';

export function WalletPicker() {
    const { wallets, select } = useWallet();
    const { publicKey } = useAppSelector((state) => state.auth);
    const { logout } = useAuth();
    
    const solanaWallets = useMemo(() => {
        return wallets
            .filter(
                (wallet) =>
                    wallet.readyState === WalletReadyState.Installed &&
                    wallet.adapter.name !== 'Brave Wallet'
            )
            .map((x) => x.adapter);
    }, [wallets]);

    // Function to truncate address
    const truncateAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    if (publicKey) {
        return (
            <Button 
                onClick={logout}
                className="flex items-center gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {truncateAddress(publicKey)}
                <LogOut className="w-4 h-4" />
            </Button>
        );
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
                    <div className="flex flex-col gap-4">
                        {solanaWallets.map((item, i) => (
                            <div
                                key={i}
                                role="button"
                                className={
                                    'flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-full py-4 px-5 hover:border-indigo-600 transition-colors cursor-pointer'
                                }
                                onClick={() => select(item.name)}
                            >
                                <p className={'text-dark/50 text-base'}>{item.name}</p>
                                <img src={item.icon} width={40} height={40} alt={item.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
