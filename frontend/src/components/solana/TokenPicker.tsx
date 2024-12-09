import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { ClipLoader } from 'react-spinners';
import { LogOutIcon } from 'lucide-react';
import { TokenInfo } from '@/types/api';

export type TokenPickerProps = {
    tokens: TokenInfo[];
    selectedToken: TokenInfo | undefined;
    setSelectedToken: (token: TokenInfo) => void;
    handlePayment: () => void;
    quantity: number;
    loading: boolean;
};

export function TokenPicker({
    tokens,
    selectedToken,
    setSelectedToken,
    handlePayment,
    quantity,
    loading,
}: TokenPickerProps) {
    const { disconnect } = useWallet();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full w-full gap-5">
                <ClipLoader size={50} color={'#123abc'} loading={loading} />
                Fetching tokens
            </div>
        );
    }

    if (tokens.length === 0) return <span className="px-2">No tokens</span>;

    return (
        <div className="flex flex-col w-full">
            {selectedToken && (
                <>
                    <div className="flex items-center space-x-2 w-full">
                        <Select
                            onValueChange={(value) =>
                                setSelectedToken(
                                    tokens.find((token) => token.metadata.symbol === value)!
                                )
                            }
                        >
                            <SelectTrigger className="flex-1 flex items-center justify-between rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <span>{selectedToken.metadata.symbol}</span>
                                <img
                                    src={selectedToken.metadata.image}
                                    alt={selectedToken.metadata.symbol}
                                    className="w-7 h-7"
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <div className="px-4 py-2 font-medium">Pay per hour | 50 USD</div>
                                {tokens.map((token) => (
                                    <SelectItem
                                        key={token.metadata.symbol}
                                        value={token.metadata.symbol}
                                    >
                                        <div className="grid grid-cols-[auto_auto_1fr] gap-4 items-center">
                                            <span>{token.metadata.symbol}</span>
                                            <img
                                                src={token.metadata.image}
                                                alt={token.metadata.symbol}
                                                width={28}
                                                height={28}
                                            />
                                            <span className="text-right">
                                                {Number(token.value)}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={handlePayment}>
                            Pay{' '}
                            {(
                                Math.trunc(
                                    Number(selectedToken.value) *
                                        (quantity === 0 ? 1 : quantity) *
                                        100
                                ) / 100
                            ).toFixed(2)}{' '}
                            {selectedToken.metadata.symbol}
                        </Button>
                        <Button
                            onClick={disconnect}
                            className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <LogOutIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
