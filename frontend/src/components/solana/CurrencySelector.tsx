import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useAppSelector } from '@/store';
import { useContext, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { TokenDisplay } from './TokenDisplay';
import { Skeleton } from '@/components/ui/skeleton';
import { TokenInfo } from '@/types/api';
import { SelectedWalletAccountContext } from '@/contexts/solana/SelectedWalletAccountContext';
import { PaymentButton } from './PaymentButton';
import BigNumber from 'bignumber.js';
import { useWallets } from '@wallet-standard/react';

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
    const { balances, error, isLoading } = useAppSelector((state) => state.user);
    const { toast } = useToast();
    const wallets = useWallets();
    const connectedWallet = wallets.find(wallet => wallet.accounts.some(account => account.publicKey));

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
        const tokenPrice = new BigNumber(token.value).dividedBy(new BigNumber(token.uiAmountString));
        if (tokenPrice.isNaN() || tokenPrice.isZero()) return '0';

        const tokenAmount = new BigNumber(basePrice).dividedBy(tokenPrice);
        
        return tokenAmount.toFixed(2);
    };

    const calculateUsdRate = (token: TokenInfo) => {
        const tokenPrice = new BigNumber(token.value).dividedBy(new BigNumber(token.uiAmountString));
        if (tokenPrice.isNaN() || tokenPrice.isZero()) return '0';

        const tokenPerUsd = new BigNumber(1).dividedBy(tokenPrice);
        
        return tokenPerUsd.toFixed(2);
    };

    const handlePaymentSuccess = (signature: string) => {
        onOpenChange(false);
        onConfirm();
        toast({
            title: "Payment Successful",
            description: (
                <a
                    href={`https://solana.fm/tx/${signature}`}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Transaction
                </a>
            ),
            variant: "default"
        });
    };

    const handlePaymentError = (errorMessage: string) => {
        toast({
            title: "Payment Failed",
            description: errorMessage,
            variant: "destructive"
        });
    };

    const isTokenSufficient = (token: TokenInfo) => {
        const tokenPrice = new BigNumber(token.value).dividedBy(new BigNumber(token.uiAmountString));
        if (tokenPrice.isNaN() || tokenPrice.isZero()) return false;
        
        const requiredTokenAmount = new BigNumber(basePrice).dividedBy(tokenPrice);
        return new BigNumber(token.uiAmountString).gte(requiredTokenAmount);
    };

    const sortTokens = (tokens: TokenInfo[]) => {
        return [...tokens].sort((a, b) => {
            const aIsSufficient = isTokenSufficient(a);
            const bIsSufficient = isTokenSufficient(b);
            
            if (aIsSufficient === bIsSufficient) {
                // If both tokens have same sufficiency status, sort by value
                return Number(b.value) - Number(a.value);
            }
            // Put sufficient tokens first
            return aIsSufficient ? -1 : 1;
        });
    };

    const selectedToken = balances?.find(t => t.metadata.symbol === selectedCurrency);

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
                    {/*isLoading ? <TokenListSkeleton /> : (*/
                        balances && balances.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                No tokens found
                            </div>
                        ) : (
                            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-3">
                                <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent w-full px-2">
                                {sortTokens(balances || []).map((token) => {
                                    const sufficient = isTokenSufficient(token);
                                    return (
                                        <div
                                            key={token.mint}
                                            className={`relative p-3 rounded-lg border-2 transition-all overflow-visible mx-auto max-w-[95%]
                                                ${!sufficient ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                                                ${selectedCurrency === token.metadata.symbol && sufficient
                                                    ? 'border-purple-500 bg-purple-50'
                                                    : sufficient
                                                        ? 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                                        : 'border-gray-200 bg-gray-50'
                                                }`}
                                            onClick={() => sufficient && setSelectedCurrency(token.metadata.symbol)}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <TokenDisplay token={token} showBalance={true} />
                                                <div className="text-right flex-shrink-0">
                                                    <div className={`text-lg font-bold ${sufficient ? 'text-purple-600' : 'text-gray-400'}`}>
                                                        {calculateTokenPrice(token)} {token.metadata.symbol}
                                                    </div>
                                                    <div className="text-[10px] text-gray-500">
                                                        Rate: 1 USD = {calculateUsdRate(token)} {token.metadata.symbol}
                                                    </div>
                                                    {!sufficient && (
                                                        <div className="text-[10px] text-red-500 mt-1">
                                                            Insufficient balance
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {selectedCurrency === token.metadata.symbol && sufficient && (
                                                <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                                                    <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {selectedCurrency && balances && selectedToken && (
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-500">You'll Pay</div>
                                    <div className="text-2xl font-bold text-purple-600">
                                        {calculateTokenPrice(selectedToken)}{' '}
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

                    {connectedWallet && selectedToken && (
                        <PaymentButton
                            account={connectedWallet.accounts[0]}
                            params={{
                                selectedToken,
                                amount: basePrice.toString(), // amount in USDC
                                onSuccess: handlePaymentSuccess,
                                onError: handlePaymentError
                            }}
                        />
                    )}

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