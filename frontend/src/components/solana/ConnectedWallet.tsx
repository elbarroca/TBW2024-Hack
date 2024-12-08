import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useCallback } from 'react';
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useToast } from '@/hooks/useToast';
import { useAppSelector } from '@/store';

export function ConnectedWallet() {
    const { logout } = useWalletAuth();
    const { toast } = useToast();
    const { wallet } = useAppSelector((state) => state.auth);

    const handleLogout = useCallback(async () => {
        await logout();
        toast({
            title: "Disconnected",
            description: "Wallet disconnected successfully",
        });
    }, [logout, toast]);

    return (
        <Button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {wallet?.account}
            <LogOut className="w-4 h-4" />
        </Button>
    );
} 