import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UiWalletAccount } from '@wallet-standard/react';

type Props = {
    account: UiWalletAccount;
    showAddress?: boolean;
};

export function WalletAccountDisplay({ account, showAddress = true }: Props) {
    const truncateAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={account.icon} />
                <AvatarFallback>
                    {account.label?.[0] || 'W'}
                </AvatarFallback>
            </Avatar>
            {showAddress && (
                <span className="text-sm font-medium">
                    {truncateAddress(account.address)}
                </span>
            )}
        </div>
    );
} 