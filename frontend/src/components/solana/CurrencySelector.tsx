import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useAppSelector } from '@/store';
import { useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { TokenDisplay } from './TokenDisplay';
import { Skeleton } from '@/components/ui/skeleton';
import { TokenInfo } from '@/types/api';

interface CurrencySelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedCurrency: string;
    setSelectedCurrency: (currency: string) => void;
    basePrice: number;
    onConfirm: () => void;
}

export function CurrencySelector({
    open,
    onOpenChange,
    selectedCurrency,
    setSelectedCurrency,
    basePrice,
    onConfirm
}: CurrencySelectorProps) {
    const { balances, isLoading, error } = useAppSelector((state) => state.userData);
    const { toast } = useToast();

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
                variant: 'destructive',
                duration: 3000,
            });
        }
    }, [error, toast]);

    const calculateTokenPrice = (token: TokenInfo) => {
        const tokenPrice = Number(token.value) / Number(token.amount);
        if (!tokenPrice || isNaN(tokenPrice)) return '0';

        const tokenAmount = basePrice / tokenPrice;
        
        return tokenAmount.toFixed(token.decimals);
    };

    const calculateUsdRate = (token: TokenInfo) => {
        const tokenPrice = Number(token.value) / Number(token.amount);
        if (!tokenPrice || isNaN(tokenPrice)) return '0';

        const tokenPerUsd = 1 / tokenPrice;
        
        return tokenPerUsd.toFixed(token.decimals);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-gradient-to-b from-gray-50 to-white">
                <DialogHeader className="space-y-3 pb-4">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Select Payment Currency
                    </DialogTitle>
                    <p className="text-gray-500 text-center text-sm">
                        Choose your preferred currency for payment
                    </p>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    {isLoading ? (
                        <TokenListSkeleton />
                    ) : balances && balances.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                            No tokens found
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
                            {balances?.map((token) => (
                                <div
                                    key={token.mint}
                                    className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer
                                        ${selectedCurrency === token.metadata.symbol
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setSelectedCurrency(token.metadata.symbol)}
                                >
                                    <div className="flex items-center justify-between">
                                        <TokenDisplay token={token} showBalance={true} />
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-purple-600">
                                                {calculateTokenPrice(token)} {token.metadata.symbol}
                                            </div>
                                            <div className="text-[10px] text-gray-500">
                                                Rate: 1 USD = {calculateUsdRate(token)} {token.metadata.symbol}
                                            </div>
                                        </div>
                                    </div>
                                    {selectedCurrency === token.metadata.symbol && (
                                        <div className="absolute top-1/2 -right-3 -translate-y-1/2">
                                            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedCurrency && balances && (
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-500">You'll Pay</div>
                                    <div className="text-2xl font-bold text-purple-600">
                                        {calculateTokenPrice(
                                            balances.find(t => t.metadata.symbol === selectedCurrency)!
                                        )}{' '}
                                        {selectedCurrency}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-500">Original Price</div>
                                    <div className="text-lg font-semibold text-gray-900">
                                        {basePrice.toFixed(2)} USD
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <Button
                        className={`w-full py-6 text-lg font-semibold transition-all ${
                            selectedCurrency
                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={onConfirm}
                        disabled={!selectedCurrency}
                    >
                        {selectedCurrency ? 'Confirm Selection' : 'Please Select a Currency'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function TokenListSkeleton() {
    return (
        <div className="space-y-4">
            {Array(3)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-2 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
        </div>
    );
} 