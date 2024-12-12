import { BigNumber } from 'bignumber.js';

export const MINT_DECIMALS: Record<string, number> = {
    'USDC': 6,
    'SOL': 9
};

export function toBase(amount: string, tokenSymbol: keyof typeof MINT_DECIMALS): number {
    try {
        const TEN = new BigNumber(10);
        const baseUnits = new BigNumber(amount)
            .times(TEN.pow(MINT_DECIMALS[tokenSymbol]))
            .integerValue(BigNumber.ROUND_FLOOR);
        
        if (baseUnits.isNaN()) {
            throw new Error('Invalid amount format');
        }
        
        return baseUnits.toNumber();
    } catch (error: any) {
        throw new Error(`Error converting amount: ${error.message}`);
    }
}