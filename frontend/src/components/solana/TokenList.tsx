import { Skeleton } from '@/components/ui/skeleton';
import { ProtectedState } from './ProtectedState';
import { TokenDisplay } from './TokenDisplay';
import { useAppSelector } from '@/store';
import { useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/CustomCard';

export function TokenList({ className = '' }: { className?: string }) {
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
    }, [error]);

    return (
        <Card className={`w-full ${className}`}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Your Tokens
                    {!isLoading && (
                        <span className="text-sm font-normal text-muted-foreground">
                            {balances?.length} tokens found
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <TokenListSkeleton />
                ) : balances?.length === 0 ? (
                    <ProtectedState />
                ) : (
                    <div className="space-y-3">
                        {balances?.map((token) => (
                            <div key={token.mint} className="p-4 rounded-lg border bg-card">
                                <TokenDisplay token={token} showBalance />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function TokenListSkeleton() {
    return (
        <>
            {Array(3)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
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
        </>
    );
}
