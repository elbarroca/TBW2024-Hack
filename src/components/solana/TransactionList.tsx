import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector } from '@/store';
import { useEffect } from 'react';
import { useToast } from '@/hooks/useToast';

export function TransactionList() {
    const {
        recentTransactions: transactions,
        isLoading,
        error,
    } = useAppSelector((state) => state.userData);
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
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Recent Transactions
                    {!isLoading && (
                        <span className="text-sm font-normal text-muted-foreground">
                            {transactions?.length} transactions
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Currency</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Signature</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TransactionListSkeleton />
                        ) : transactions?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center text-muted-foreground"
                                >
                                    No transactions found
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions?.map((tx) => (
                                <TableRow key={tx.signature}>
                                    <TableCell>
                                        {tx.signer === tx.signer ? '↑ Send' : '↓ Receive'}
                                    </TableCell>
                                    <TableCell>{tx.amount}</TableCell>
                                    <TableCell>{tx.currency}</TableCell>
                                    <TableCell>
                                        {new Date(tx.timestamp).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="font-mono">
                                        <a
                                            href={`https://solana.fm/tx/${tx.signature}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function TransactionListSkeleton() {
    return (
        <>
            {Array(5)
                .fill(0)
                .map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-48" />
                        </TableCell>
                    </TableRow>
                ))}
        </>
    );
}
