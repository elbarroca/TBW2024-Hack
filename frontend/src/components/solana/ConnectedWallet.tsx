import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useCallback } from 'react';
import { useAppSelector } from '@/store';
import { resetAuth } from '@/store/auth';

export function ConnectedWallet() {
    const { account } = useAppSelector((state) => state.auth);

    const handleLogout = useCallback(async () => {
        // do proper disconnect wallet
        resetAuth();
    }, [resetAuth]);

    const truncateAddress = (address: string): string => {
        if (!address) return '';
        const firstFive = address.slice(0, 7); // includes "0x" prefix
        const lastFour = address.slice(-4);
        return `${firstFive}...${lastFour}`;
    };
    return (
        <Button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {truncateAddress(account || '')}
            <LogOut className="w-4 h-4" />
        </Button>
    );
} 