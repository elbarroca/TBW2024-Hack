import { Button } from '@/components/ui/button';
import { resetAuth } from '@/store/auth';
import { UiWallet, useDisconnect } from '@wallet-standard/react';
import { LogOut } from 'lucide-react';
import { useCallback } from 'react';

export function ConnectedWallet({ connectedWallet }: { connectedWallet: UiWallet }) {
    const [_, disconnect] = useDisconnect(connectedWallet);

    const truncateAddress = (address: string): string => {
        if (!address) return '';
        const firstFive = address.slice(0, 7);
        const lastFour = address.slice(-4);
        return `${firstFive}...${lastFour}`;
    };

    const handleLogout = useCallback(async () => {
        resetAuth();
        disconnect();
    }, [resetAuth, disconnect]);
    
    return (
        <Button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {truncateAddress(connectedWallet.accounts[0].address || '')}
            <LogOut className="w-4 h-4" />
        </Button>
    );
} 