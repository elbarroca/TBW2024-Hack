import { useWallet } from '@solana/wallet-adapter-react';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { Wallet } from 'lucide-react';

export function WalletPicker() {
    const { wallets, select } = useWallet();
    const solanaWallets = useMemo(() => {
        return wallets
            .filter(
                (wallet) =>
                    wallet.readyState === WalletReadyState.Installed &&
                    wallet.adapter.name !== 'Brave Wallet'
            )
            .map((x) => x.adapter);
    }, [wallets]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Connect wallet <Wallet className="w-4 h-4" />
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
                                    'flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-full py-4 px-5'
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
