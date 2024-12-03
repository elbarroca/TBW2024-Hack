import BigNumber from "bignumber.js";
import { getTokenMetadata, TokenMetadata } from "./getTokenMetadata";
import { getTokenAccounts } from "./getTokenAccounts";
import { getMints } from "./getMint";
import { getPrices } from "./getPrices";
import { TokenAmount } from "@solana/rpc-types";
import { Address } from "@solana/addresses";

export type TokenInfo = {
  mint: string;
  address: string;
  amount: string;
  value: string;
  decimals: number;
  metadata: TokenMetadata;
};

const THRESHOLD_VALUE_USD = new BigNumber(1);

function calculateValue(tokenAmount: TokenAmount, decimals: number, price: number): BigNumber {
  return new BigNumber(tokenAmount.amount)
    .dividedBy(new BigNumber(10).pow(decimals))
    .multipliedBy(new BigNumber(price));
}

export async function getTokens(userKey: string): Promise<TokenInfo[]> {
  try {
    const tokenAccounts = await getTokenAccounts(userKey as Address);

    const [mints, prices] = await Promise.all([
      getMints(tokenAccounts.map(account => account.account.mint.toString())),
      getPrices(tokenAccounts.map(account => account.account.mint.toString()))
    ]);

    const tokens = await Promise.all(
      tokenAccounts.map(async ({ pubkey, account }) => {
        try {
          const mint = account.mint.toString();
          const mintData = mints[mint];
          if (!mintData) return null;
  
          const price = prices.data[mint]?.price ?? 0;
          const value = calculateValue(account.tokenAmount, mintData.decimals, price);
          if (value.isLessThan(THRESHOLD_VALUE_USD)) return null;
          
          const metadata = await getTokenMetadata(mint);
          return {
            mint,
            address: pubkey.toString(),
            amount: account.tokenAmount.uiAmountString.toString(),
            value: value.toFixed(2),
            decimals: mintData.decimals,
            metadata
          };
        } catch (error) {
          console.warn(`Error processing token account ${pubkey}:`, error);
          return null;
        }
      })
    );

    return tokens.filter((token): token is TokenInfo => token !== null);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
}