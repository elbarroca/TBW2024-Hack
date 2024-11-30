import { TokenInfo } from '@/api/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatNumber } from '@/lib/utils';

interface TokenDisplayProps {
    token: TokenInfo;
    showBalance?: boolean;
    className?: string;
}

export function TokenDisplay({ token, showBalance = true, className = '' }: TokenDisplayProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Avatar className="h-7 w-7">
                <AvatarImage src={token.metadata.image} alt={token.metadata.symbol || 'Token'} />
                <AvatarFallback>{token.metadata.symbol?.[0] || 'T'}</AvatarFallback>
            </Avatar>

            <div className="space-y-0.5">
                <p className="font-medium">{token.metadata.symbol || 'Unknown Token'}</p>
                {showBalance && (
                    <p className="text-sm text-muted-foreground">
                        {formatNumber(Number(token.amount), {
                            maximumFractionDigits: 2,
                        })}
                    </p>
                )}
            </div>
        </div>
    );
}
