import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TokenInfo } from '@/types/api';

interface TokenDisplayProps {
    token: TokenInfo;
    showBalance?: boolean;
    className?: string;
}

export function TokenDisplay({ token, showBalance = true, className = '' }: TokenDisplayProps) {
    const formatTokenAmount = (amount: string, decimals: number = 2) => {
        const value = Number(amount);
        if (isNaN(value)) return '0';
        
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            notation: value > 1000000 ? 'compact' : 'standard'
        }).format(value);
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Avatar className="h-7 w-7">
                <AvatarImage 
                    src={token.metadata.image} 
                    alt={token.metadata.symbol || 'Token'} 
                    onError={(e) => {
                        console.error('Failed to load image:', token.metadata.image);
                    }}
                />
                <AvatarFallback>
                    {token.metadata.symbol?.[0]?.toUpperCase() || 'T'}
                </AvatarFallback>
            </Avatar>

            <div className="space-y-0.5">
                <p className="font-medium">
                    {token.metadata.symbol || 'Unknown Token'}
                </p>
                {showBalance && (
                    <p className="text-sm text-muted-foreground">
                        {formatTokenAmount(token.amount, token.decimals)}
                    </p>
                )}
            </div>
        </div>
    );
}
